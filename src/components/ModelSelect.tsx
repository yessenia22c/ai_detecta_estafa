import { OpenAIModel } from '@/types/types';
import { FC } from 'react';

interface Props {
  model: OpenAIModel;
  onChange: (model: OpenAIModel) => void;
}

export const ModelSelect: FC<Props> = ({ model, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as OpenAIModel);
  };

  return (
    <select
      className="h-[40px] w-[140px] rounded-md bg-[#404a58] px-4 py-2 text-neutral-200 "
      value={model}
      onChange={handleChange}
    >
      <option value="gpt-3.5-turbo">GPT-3.5</option>
      <option className='hover:bg-green-600'  value="gpt-4">GPT-4</option>
    </select>
  );
};
