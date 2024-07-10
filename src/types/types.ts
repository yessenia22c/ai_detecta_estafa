export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4';

export interface VerificationUrl {
    url: string;
    model: OpenAIModel;
    apiKey: string;
}

export interface TranslateResponse {
  code: string;
}
