import { createServerFn } from "@tanstack/react-start";
import { nanoid } from "nanoid";
import { env } from "cloudflare:workers";
import { getRequestIP } from "@tanstack/react-start/server";

const DAILY_LIMIT = 5;

export const createFeedbackFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as { message: string })
  .handler(async ({ data }) => {
    const message = String(data.message ?? "").trim().slice(0, 2000);
    if (!message) throw new Error("Empty feedback");

    const kv = (env as { FEEDBACK_KV?: KVNamespace }).FEEDBACK_KV;
    if (!kv) throw new Error("FEEDBACK_KV binding is not configured");

    // Rate limit by IP — silent, just throw a generic error
    const ip = getRequestIP() ?? "unknown";
    const day = new Date().toISOString().slice(0, 10); // "2026-03-18"
    const ratKey = `rate:${ip}:${day}`;
    const count = Number((await kv.get(ratKey)) ?? 0);
    if (count >= DAILY_LIMIT) throw new Error("Too many requests");

    const id = nanoid(10);
    await kv.put(
      id,
      JSON.stringify({ message, createdAt: new Date().toISOString() }),
      { expirationTtl: 60 * 60 * 24 * 365 }, // 1 year
    );

    // Increment rate counter, expires at end of day
    const secondsUntilMidnight =
      86400 - (Math.floor(Date.now() / 1000) % 86400);
    await kv.put(ratKey, String(count + 1), {
      expirationTtl: secondsUntilMidnight,
    });

    return { ok: true };
  });
