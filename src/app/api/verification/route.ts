import { VerificationUrl } from '@/types/types';
import { scrapeWebsite } from '@/utils';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText, StreamingTextResponse, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


export async function POST(req: Request) {
    //console.log('EL BODY===????', req)
    const body = await req.json();
    const { url, model, apiKey } = body;

    //const { url, model, apiKey } = await (req.json()) as VerificationUrl;

    const openai = createOpenAI({
        apiKey: apiKey || process.env.OPENAI_API_KEY,
        compatibility: 'strict'
    });
    const context = await scrapeWebsite(url);
    //console.log('CONTEXTOOOOOOOOOO', context)
    const { text } = await generateText({
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey || process.env.OPENAI_API_KEY}`,
            },
            model: openai(model),
            // system: "Eres un experto analista de sitios web fraudulentos",
            prompt: context,
            maxTokens: 650
         });

    return Response.json({ text });;

}