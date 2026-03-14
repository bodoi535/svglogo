import { nanoid } from "nanoid";
import { redis } from "#/lib/redis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { logoState } = await req.json();

    if (!logoState) {
      return NextResponse.json({ error: "No logo state provided" }, { status: 400 });
    }

    // Generate a unique 6-character ID
    const id = nanoid(6);

    // Save state in Redis for 30 days
    await redis.set(`share:${id}`, JSON.stringify(logoState), "EX", 60 * 60 * 24 * 30);

    return NextResponse.json({ id });
  } catch (error) {
    console.error("Failed to generate share link:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
