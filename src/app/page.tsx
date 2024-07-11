"use client";
import { APIKeyInput } from "@/components/APIKeyInput";
import { ModelSelect } from "@/components/ModelSelect";
import { UrlInput } from "@/components/UrlInput";
import { RadialChart } from "@/components/ui/RadialChart";
import { Factores, OpenAIModel, RespuestaOpenAI, VerificationUrl } from "@/types/types";
import axios from "axios";
import { List } from "postcss/lib/list";
import { useState } from "react";
import { set } from "zod";



export default function Home() {
  const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');
  const [apiKey, setApiKey] = useState<string>('');
  const [urlWeb, setUrlWeb] = useState<string>('');
  const [responseString, setResponseString] = useState<RespuestaOpenAI>();
  const [loading, setLoading] = useState<boolean>(false);
  const [activado, setActivado] = useState<boolean>(true);
  let response : RespuestaOpenAI ;
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
        <RadialChart confiable={responseString?.data.probabilidad_confiable} estafa={responseString?.data.probabilidad_estafa}></RadialChart>
            <div className="flex flex-row p-4 mx-4 gap-8">
            <div>
              <h2 className="font-medium text-[18px]"> Factores negativos</h2>
              <ul>
                  {responseString?.data && responseString?.data?.factores_negativos?.map((factor: Factores) => (
                      <li className=" text-[14px] w-[350px] p-2 border rounded-md my-2 border-red-600" key={factor.id}>{factor.descripcion}</li>
                  ))}
              </ul>
            </div>
            <div>
              <h2 className="font-medium text-[18px]"> Factores positivos</h2>
              <ul>
                  {responseString?.data && responseString?.data?.factores_positivos?.map((factor: Factores) => (
                      <li className=" text-[14px] w-[350px] p-2 border rounded-md my-2 border-green-600"  key={factor.id}>{factor.descripcion}</li>
                  ))}
              </ul>
            </div>
            </div>
        {/* <p>{responseString?.data}</p> */}
      </div>
    </>
  );
}
