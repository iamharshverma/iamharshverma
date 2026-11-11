import { createServerFn } from "@tanstack/react-start";
import { enquirySchema } from "./enquiry-schema";

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    // Public insert-only lead capture. No caller can read or change stored requests.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { website: _website, preferred_date, ...fields } = data;
    const { data: row, error } = await supabaseAdmin.from("portfolio_enquiries")
      .insert({ ...fields, preferred_date: preferred_date || null })
      .select("id").single();
    if (error || !row) throw new Error("Unable to save your request. Please try again shortly.");
    return { id: row.id };
  });