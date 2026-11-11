import { z } from "zod";

export const enquirySchema = z.object({
  kind: z.enum(["booking", "contact"]),
  topic: z.enum(["Keynote", "Advisory", "Media", "Other"]),
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  organization: z.string().trim().max(200).default(""),
  preferred_date: z.string().refine(v => !v || /^\d{4}-\d{2}-\d{2}$/.test(v), "Choose a valid date.").default(""),
  location: z.string().trim().max(200).default(""),
  format: z.enum(["Virtual", "In person", "Hybrid"]).default("Virtual"),
  message: z.string().trim().min(1, "Please describe your enquiry.").max(3000),
  website: z.string().max(0).optional(),
}).superRefine((v, ctx) => {
  if (v.kind === "booking" && !["Keynote", "Advisory"].includes(v.topic)) ctx.addIssue({ code: "custom", path: ["topic"], message: "Choose keynote or advisory." });
  if (v.preferred_date) {
    const date = new Date(`${v.preferred_date}T23:59:59Z`);
    if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== v.preferred_date || date.getTime() < Date.now()) ctx.addIssue({ code: "custom", path: ["preferred_date"], message: "Choose today or a future date." });
  }
});