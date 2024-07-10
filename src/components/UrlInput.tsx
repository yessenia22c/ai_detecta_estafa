import { FC } from "react";

interface Props {
    urlWeb: string;
    onChange: (urlWeb: string) => void;
  }

export const UrlInput : FC<Props> =({urlWeb, onChange}) => {
  return (
    <input
        className="mt-1 h-[24px] w-[280px] rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        type="url"
        placeholder="www.ejemplo.com"
        value={urlWeb}
        onChange={(e) => onChange(e.target.value)}
      />
  )
}
