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
      let prompt: string = ` <Verificar> ${list} </Verificar>`;
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
