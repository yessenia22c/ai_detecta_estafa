"use client";
import { APIKeyInput } from "@/components/APIKeyInput";
import { ModelSelect } from "@/components/ModelSelect";
import { UrlInput } from "@/components/UrlInput";
import { RadialChart } from "@/components/ui/RadialChart";
import { OpenAIModel } from "@/types/types";
import { useState } from "react";



export default function Home() {
  const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');
  const [apiKey, setApiKey] = useState<string>('');
  const [urlWeb, setUrlWeb] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleVerification = async () => {
    const maxCodeLength = model === 'gpt-3.5-turbo' ? 6000 : 12000;

    if (!apiKey) {
      alert('Por favor, introduzca una clave de API OpenAI válida');
      return;
    }
    if (!urlWeb) {
      alert('Por favor, introduzca una url válida');
      return;
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
      </div>
    </>
  );
}
