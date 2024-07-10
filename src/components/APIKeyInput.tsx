interface Props {
    apiKey: string;
    onChange: (apiKey: string) => void;
  }
  
  
  export const APIKeyInput: React.FC<Props> = ({ apiKey, onChange }) => {
    return (
      <input
        className="sm:w-[280px] w-60 mt-1 h-[30px] mx-2 rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        type="password"
        placeholder="OpenAI API Key"
        value={apiKey}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };
  