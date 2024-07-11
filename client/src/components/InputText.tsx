import {
  forwardRef,
  ForwardRefRenderFunction,
  SyntheticEvent,
  useState,
} from "react";

import { InputHTMLAttributes } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface IInputText extends InputHTMLAttributes<HTMLInputElement> {
  field: string;
  label: string;
  errorText?: string;
  passwordHelper?: boolean;
}

const InputTextWithRef: ForwardRefRenderFunction<
  HTMLInputElement,
  IInputText
> = ({ field, label, errorText, passwordHelper = false, ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const passwordHelperState = showPassword ? "text" : "password";

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
          ref={ref}
          className="text-xl font-sans px-3 py-2 rounded-lg focus:outline-none w-full"
          id={field}
          type={passwordHelper ? passwordHelperState : "text"}
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
      {errorText && <p className="text-red-700 font-semibold">{errorText}</p>}
    </div>
  );
};

const InputText = forwardRef(InputTextWithRef);

export default InputText;
