import { z } from "zod";
import { enquirySchema } from "./enquiry-schema";

export const interviewFormats = ["Written interview", "Podcast", "Video interview", "Broadcast", "Panel discussion", "Expert commentary", "Other"] as const;
export const mediaEnquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  organization: z.string().trim().min(1, "Please enter your publication or organization.").max(200),
  publication_url: z.union([z.literal(""), z.string().url().refine(url => /^https?:\/\//.test(url), "Use an http or https publication website.")]),
  interview_topic: z.string().trim().min(1, "Please enter an interview topic.").max(200),
  interview_format: z.enum(interviewFormats),
  preferred_date: z.string(),
  message: z.string().trim().max(2000),
  website: z.string().max(0),
}).transform(data => ({
  kind: "contact" as const, topic: "Media" as const,
  name: data.name, email: data.email, organization: data.organization,
  preferred_date: data.preferred_date, website: data.website,
  message: `Interview topic: ${data.interview_topic}\nInterview format: ${data.interview_format}${data.publication_url ? `\nPublication website: ${data.publication_url}` : ""}\n\n${data.message}`,
})).pipe(enquirySchema);