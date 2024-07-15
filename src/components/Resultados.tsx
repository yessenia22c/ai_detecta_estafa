
import { Factores, RespuestaOpenAI } from "../types/types";

interface Props {
    responseString: RespuestaOpenAI | undefined;
}
export const Resultados : React.FC<Props> = ({responseString}) => {
  return (
    <>
        <a href="#resultados" >Ver resultados</a>
        <div id="resultados" className="md:flex flex-row p-4 mx-4 gap-8">
          <div>
            <h2 className="font-medium text-[18px]"> Factores negativos</h2>
            <ul>
                {responseString?.data && responseString?.data?.factores_negativos?.map((factor: Factores) => (
                    <li className=" text-[14px] w-[350px] p-2 border-2 rounded-md my-4 border-[#cc1937]" key={factor.id}>
                      <img className="absolute -mt-4 -ml-4" src="/error.svg" alt="posibles puntos de estafas" />
                      
                      {factor.descripcion}</li>
                ))}
            </ul>
          </div>
          <div>
            <h2 className="font-medium text-[18px]"> Factores positivos</h2>
            <ul>
                {responseString?.data && responseString?.data?.factores_positivos?.map((factor: Factores) => (
                    <li className=" text-[14px] w-[350px] p-2 border-2 rounded-md my-4 border-[#2a9d90]"  key={factor.id}>
                      <img className="absolute -mt-4 -ml-4" src="/check.svg" alt="posibles puntos de estafas" />
                      {factor.descripcion}
                    
                    </li>
                ))}
            </ul>
          </div>
        </div>
    </>
  )
}
