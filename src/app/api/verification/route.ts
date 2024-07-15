import { VerificationUrl } from "@/types/types";
import { scrapeWebsite } from "@/utils";
import { createOpenAI } from "@ai-sdk/openai";
import {
  generateObject,
  generateText,
  StreamingTextResponse,
  streamText,
} from "ai";
import { stat } from "fs";
import { z } from "zod";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  //console.log('EL BODY===????', req)
  const body = await req.json();
  const { url, model, apiKey } = body;

  //const { url, model, apiKey } = await (req.json()) as VerificationUrl;

  const openai = createOpenAI({
    apiKey: apiKey || process.env.OPENAI_API_KEY,
    compatibility: "strict",
  });
  const context = await scrapeWebsite(url);
  //console.log('CONTEXTOOOOOOOOOO', context)
  const resultado = await generateObject({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey || process.env.OPENAI_API_KEY}`,
    },
    model: openai(model),
    // system: "Eres un experto analista de sitios web fraudulentos",
    prompt: context,
    system:
      `Eres un experto analista de sitios web fraudulentos, que intentan vender productos o 
      servicios a través de internet con el objetivo de estafar a los usuarios, 
      enlistas siempre al menos un máximo de 5 factores positivos y negativos de 
      un sitio web si tienes suficente información para tu análisis y das una 
      probabilidad de que sea una estafa o confiable, la suma de ambas no debe pasar de 100, 
      considera en tu análisis las expresiones verbales, la ortografía, la coherencia del texto, 
      y la url del sitio web todo esto de lo que hay entre las etiquetas <Verificar></Verificar> 
      del prompt, que es el contenido extraído del sitio web a analizar, 
      cada texto tiene su respectiva etiqueta HTML delante de su contenido,
      y adelante la url del sitio web para el análisis, soo debes devolver 
      un formato de objeto con status 200 si hay resultados o 404 si no hay 
      suficiente información para analizar`,
    maxTokens: 650,
    schema: z.object({
      status: z
        .number()
        .describe(
          "el estado debe ser 200 si hay resultados o 404 si no hay suficiente información para analizar"
        ),
      data: z.object({
        url: z.string().describe("la url del sitio web analizado"),
        factores_negativos: z.array(
          z.object({
            id: z.number(),
            descripcion: z
              .string()
              .describe("Aquí una descripción negativa de un análisis "),
          })
        ),
        factores_positivos: z.array(
          z.object({
            id: z.number(),
            descripcion: z
              .string()
              .describe("Aquí una descripción positiva de un análisis"),
          })
        ),
        probabilidad_estafa: z
          .number()
          .describe(
            "probabilidad de que el sitio web sea una estafa del 1 al 100"
          ),
        probabilidad_confiable: z
          .number()
          .describe(
            "probabilidad de que el sitio web sea confiable del 1 al 100"
          ),
      }),
    }),
  });

  return resultado.toJsonResponse();
}
