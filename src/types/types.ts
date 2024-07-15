export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4';

export interface VerificationUrl {
    url: string;
    model: OpenAIModel;
    apiKey: string;
}

export interface TranslateResponse {
  code: string;
}

export interface RespuestaOpenAI {
  status: number;
  data:   Data;
}

export interface Data {
  url:                    string;
  descripcion:            string;
  factores_positivos:     Factores[];
  factores_negativos:     Factores[];
  probabilidad_estafa:    number;
  probabilidad_confiable: number;
  recomendacion:          string;
}

export interface Factores {
  id:          number;
  descripcion: string;
}
