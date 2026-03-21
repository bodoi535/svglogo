import { getSupabaseServerClient, getSupabaseServiceClient } from "#/lib/supabase";
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

export const signUpEarlyAccessFn = createServerFn({ method: "POST" }).handler(
  async () => {
    const supabase = getSupabaseServerClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user?.email) return;

    const service = getSupabaseServiceClient();
    const { error } = await service
      .from("early_access")
      .upsert({ email: data.user.email.toLowerCase().trim() }, { onConflict: "email" });

    if (error) {
      console.error("early_access upsert failed:", error);
      throw new Error(error.message);
    }

    if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
      await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: `🎉 Early access signup (in-app): ${data.user.email}`,
        }),
      });
    }
  },
);
