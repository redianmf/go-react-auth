import { InputHTMLAttributes } from "react";

interface IInputText extends InputHTMLAttributes<HTMLInputElement> {
  field: string;
  label: string;
}

const InputText: React.FC<IInputText> = ({ field, label, ...rest }) => {
  return (
    <div className="flex flex-col">
      <label className="font-body text-gold text-xl my-1" htmlFor={field}>
        {label}
      </label>
      <input
        {...rest}
        className="text-xl font-sans p-2 rounded-lg focus:outline-none"
        id={field}
        type="text"
      />
    </div>
  );
};

export default InputText;
