"use client";
import { APIKeyInput } from "@/components/APIKeyInput";
import { ModelSelect } from "@/components/ModelSelect";
import { Resultados } from "@/components/Resultados";
import { UrlInput } from "@/components/UrlInput";
import { RadialChart } from "@/components/ui/RadialChart";
import { Factores, OpenAIModel, RespuestaOpenAI, VerificationUrl } from "@/types/types";
import axios from "axios";
import { List } from "postcss/lib/list";
import { useState } from "react";
import { set } from "zod";
import { z } from "zod";

const urlSchema = z.string().url();
export default function Home() {
  const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');
  const [apiKey, setApiKey] = useState<string>('');
  const [urlWeb, setUrlWeb] = useState<string>('');
  const [responseString, setResponseString] = useState<RespuestaOpenAI>();
  const [loading, setLoading] = useState<boolean>(false);
  const [verificando, setVerificando] = useState<boolean>(false);
  const [activado, setActivado] = useState<boolean>(true);
  const [urlError, setUrlError] = useState<string>('');
  let response : RespuestaOpenAI ;

  
  const handleVerification = async () => {
    

    if (!apiKey) {
      alert('Por favor, introduzca una clave de API OpenAI válida');
      return;
    }
    try {
      urlSchema.parse(urlWeb);
      setUrlError(''); // Clear the error if URL is valid
    } catch (error) {
      setUrlError('La URL no es válida');
      return;
    }
    // if (!urlWeb) {
    //   alert('Por favor, introduzca una url válida');
    //   return;
      
    // }
    let data : VerificationUrl={
      url: urlWeb,
      model: model,
      apiKey: apiKey
    }
    

    try {
      setLoading(true);
      setVerificando(true);
      setActivado(false);
      const res = await axios.post('/api/verification', data);

      setResponseString(res.data);
      
      setLoading(false);
      setActivado(true);
      
    } catch (error) {
      setLoading(false);
      console.error('Ocurrio algo:', error);
    }
  }; 
  const handleApiKeyChange = (value: string) => {
    console.log(value);
    setApiKey(value);

    localStorage.setItem('apiKey', value);
  };
  const handleUrl= (value: string) => {
    console.log(value);
    setUrlWeb(value);
  };
  console.log(responseString);
  return (
    <>
      <div className="flex h-full min-h-screen flex-col items-center bg-[#091224] px-4 pb-20 text-neutral-200 sm:px-10">
        <div className="flex flex-col items-center justify-between py-8">
          <APIKeyInput
            apiKey={apiKey}
            onChange={handleApiKeyChange}
          ></APIKeyInput>
          <div className="p-6 flex flex-col items-center">
            <label htmlFor="Url"> Introduce la url a verficar</label>
            <UrlInput urlWeb={urlWeb} onChange={handleUrl}></UrlInput>
            {urlError && <p className="text-red-500 text-sm mt-2">{urlError}</p>}
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <ModelSelect model={model} onChange={(value) => setModel(value)} />

            <button
              className={`w-[140px] cursor-pointer rounded-md px-4 py-2 font-bold ${
                activado ? 'bg-green-600 hover:bg-green-500 active:bg-green-700': 'bg-gray-400 cursor-not-allowed' 
              }`}
              onClick={() => handleVerification()}
              disabled={loading}
            >
              {loading ? "Verificando..." : "Verificar"}
            </button>
          </div>
          
        </div>
        <div className={verificando?"block":"hidden"}>
          {loading ? 
          <div className="flex justify-center items-center">
            <h3 className="absolute text-[16px]">Analizando...</h3>
            <video className="mix-blend-screen" width="720" height="520" src="/analizando-web.webm" loop autoPlay muted></video>
          </div>:
          <div>
            <RadialChart confiable={responseString?.data.probabilidad_confiable} estafa={responseString?.data.probabilidad_estafa}></RadialChart>

            <Resultados responseString={responseString}></Resultados>
          </div>
          
          }
        </div>
        
        
        
      </div>
    </>
  );
}
