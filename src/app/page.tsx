"use client";
import { APIKeyInput } from "@/components/APIKeyInput";
import { ModelSelect } from "@/components/ModelSelect";
import { UrlInput } from "@/components/UrlInput";
import { RadialChart } from "@/components/ui/RadialChart";
import { OpenAIModel, VerificationUrl } from "@/types/types";
import axios from "axios";
import { List } from "postcss/lib/list";
import { useState } from "react";



export default function Home() {
  const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');
  const [apiKey, setApiKey] = useState<string>('');
  const [urlWeb, setUrlWeb] = useState<string>('');
  const [responseString, setResponseString] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleVerification = async () => {

    if (!apiKey) {
      alert('Por favor, introduzca una clave de API OpenAI válida');
      return;
    }
    if (!urlWeb) {
      alert('Por favor, introduzca una url válida');
      return;
      
    }
    let data : VerificationUrl={
      url: urlWeb,
      model: model,
      apiKey: apiKey
    }
    

    try {
      setLoading(true);
      const res = await axios.post('/api/verification', data);

      setResponseString(res.data.text);
      setLoading(false);
    } catch (error) {
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
  //const response = JSON.parse(responseString);
  return (
    <>
      <div className="flex h-full min-h-screen flex-col items-center bg-[#091224] px-4 pb-20 text-neutral-200 sm:px-10">
        <div className="flex flex-col items-center justify-between p-24">
          <APIKeyInput
            apiKey={apiKey}
            onChange={handleApiKeyChange}
          ></APIKeyInput>
          <div className="p-6 flex flex-col items-center">
            <label htmlFor="Url"> Introduce la url a verficar</label>
            <UrlInput urlWeb={urlWeb} onChange={handleUrl}></UrlInput>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <ModelSelect model={model} onChange={(value) => setModel(value)} />

            <button
              className="w-[140px] cursor-pointer rounded-md bg-green-600 px-4 py-2 font-bold hover:bg-green-500 active:bg-green-700"
              onClick={() => handleVerification()}
              disabled={loading}
            >
              {loading ? "Verificando..." : "Verificar"}
            </button>
          </div>
          
        </div>
        <RadialChart></RadialChart>
            {/* <ul>
                {response.data && response.data.factores_negativos.map((factor: any) => (
                    <li key={factor.id}>{factor.descripion}</li>
                ))}
            </ul>
            <ul>
                {response.data && response.data.factores_positivos.map((factor: any) => (
                    <li key={factor.id}>{factor.descripion}</li>
                ))}
            </ul> */}
        <p>{responseString}</p>
      </div>
    </>
  );
}
