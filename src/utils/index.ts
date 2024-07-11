import { generateText } from "ai";
import axios from "axios";
import { JSDOM } from "jsdom";

export const scrapeWebsite = async (url: string) => {
  try {
    let list: any = [];
    const response = await axios.get(url);
    const parser = new JSDOM(response.data);
    const selectedElements = parser.window.document.querySelectorAll(
      "h1, h2, h3, h4, h5, p, span, button"
    );

    const elements = Array.from(selectedElements).map((element: any) => {
      list = [...list, element.tagName + ": " + element.textContent];
    });
    list = ["URL DEL SITIO WEB: " + url, ...list];
    // console.log(list)
      let prompt: string = `Eres un experto analista informático muy serio que identifica sitios web con probabilidades de que 
      sea una estafa o no, considerando la información, ortografía, expresiones y la url del sitio web,  
      Debes verificar todo el contenido que hay entre la etiqueta <Verificar> ${list} </Verificar> eso es el contenido extraído de un sitio web, cada texto tiene su respectiva etiqueta HTML y adelante la url del sitio web para el análisis, Tu única misión es sacar máximo 5 Factores positivos y negativos según lo que consideres de lo que hay entre esa etiqueta y luego de obtener ambos factores analizados devuelve lo siguiente según tu análisis: el porcentaje de que sea una estafa o sea confiable, por ejemplo, del 1 al 100 un 70 si es confiable y un 30 si es una estafa, la suma de ambos nunca debe pasar los 100. 
      Finalmente, solo devuelve el resultado en un objeto JSON utilizando este formato:
        "status": 200,
        "data":{
            "url": "ejemplo.com",
            "factores_positivos":[
                {
                    "id":1,
                    "descripion": "Aquí una descripción de un análisis"
                },
                {
                    "id":2,
                    "descripion": "Aquí una descripción de un análisis"
                },
                {
                    "id":3,
                    "descripion": "Aquí una descripción de un análisis"
                }
            ],
            "factores_negativos":[
                {
                    "id":1,
                    "descripion": "Aquí una descripción de un análisis"
                },
                {
                    "id":2,
                    "descripción": "Aquí una descripción de un análisis"
                },
                {
                    "id":3,
                    "descripion": "Aquí una descripción de un análisis"
                },
                {
                    "id":4,
                    "descripion": "Aquí una descripción de un análisis"
                }
            ],
        "probabilidad_estafa": 70,
        "probabilidad_confiable": 30
        }

    }

    Si no tienes la suficiente información para analizar solo devuelve este objeto JSON:
    {
        "status": 404,
        "message":"No hay suficiente información para analizar"
    }

    Importante: solo debes devolver un formato de objeto JSON de una de las maneras especificadas anteriormente. No inventes otro formato de resultado.
    `;
    return prompt;
  } catch (error) {
    console.error("Error escanear el sitio web:", error);
    return "Error escanear el sitio web: " + error;
  }
};

// export const generarPrompt = (url) => {
//     const context = scrapeWebsite('https://www.ejemplo.com');
//     return `<Verificar> ${context} </Verificar>`;
// }

export const openAiGenerateText = async (req: Request) => {
  const { model, system, prompt } = await req.json();
  const { text } = await generateText({ model, system, prompt });
  return text;
};
