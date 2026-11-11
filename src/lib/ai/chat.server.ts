import { convertToModelMessages, type UIMessage } from "ai";
import { createResponsesCall } from "./responses";
import { buildInstructions } from "./knowledge.server";

const MAX_MESSAGES = 20;

export async function handleChat(request: Request) {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) return Response.json({ error: "The assistant isn't configured yet." }, { status: 500 });

  let messages: UIMessage[];
  try {
    const body = (await request.json()) as { messages?: unknown };
    if (!Array.isArray(body.messages) || body.messages.length === 0) throw new Error("bad");
    messages = (body.messages as UIMessage[]).slice(-MAX_MESSAGES);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const modelMessages = await convertToModelMessages(messages);
  const call = createResponsesCall(
    request,
    { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" },
    modelMessages,
    buildInstructions(),
  );
  return call.response();
}
