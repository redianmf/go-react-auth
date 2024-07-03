import { SyntheticEvent, useState } from "react";

import { InputHTMLAttributes } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface IInputText extends InputHTMLAttributes<HTMLInputElement> {
  field: string;
  label: string;
  passwordHelper?: boolean;
}

const InputText: React.FC<IInputText> = ({
  field,
  label,
  passwordHelper = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = (e: SyntheticEvent) => {
    e.preventDefault();
    setShowPassword((current) => !current);
  };

  return (
    <div className="flex flex-col">
      <label className="font-body text-gold text-xl my-1" htmlFor={field}>
        {label}
      </label>
      <div className="relative">
        <input
          {...rest}
          className="text-xl font-sans px-3 py-2 rounded-lg focus:outline-none w-full"
          id={field}
          type={showPassword ? "text" : "password"}
        />
        {passwordHelper && (
          <button
            onClick={togglePassword}
            className="absolute inset-y-0 end-0 flex items-center pe-3 text-2xl text-slate-700 hover:text-slate-400"
          >
            {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputText;
