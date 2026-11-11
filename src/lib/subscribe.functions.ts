import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const LISTS = ["newsletter", "book-beyond-ai-engineering", "book-ai-vs-ai"] as const;
export const subscribeSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  list: z.enum(LISTS),
  website: z.string().max(0).optional(), // honeypot
});

export const subscribe = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => subscribeSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("portfolio_subscribers")
      .upsert({ email: data.email.toLowerCase(), list: data.list }, { onConflict: "email,list", ignoreDuplicates: true });
    if (error) throw new Error("Couldn't save your signup. Please try again.");
    return { ok: true };
  });
