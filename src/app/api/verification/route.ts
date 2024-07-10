import { createOpenAI, openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    let  context  = "Verificar la autenticidad de una url" 
    const { messages } = await req.json();
    const prompt = createOpenAI()
    const result = await streamText({
        prompt: context,
        model: openai('gpt-4-turbo'),
        messages,
    });

    return result.toAIStreamResponse();
}