import { ButtonHTMLAttributes, forwardRef } from "react";
import { TbFidgetSpinner } from "react-icons/tb";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | JSX.Element;
  classes?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ children, disabled, isLoading, classes, ...props }, ref) => {
    const isInactive: boolean | undefined = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isInactive}
        className={`w-full my-5 transition-all duration-700 text-xl font-bold font-body  text-white p-3 rounded  ${isInactive ? "bg-slate-300 hover:bg-slate-300 cursor-not-allowed" : "bg-slate-700 hover:bg-gold"} ${classes}`}
        {...props}
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <p>Loading</p>
            <TbFidgetSpinner className="spinner ml-1" />
          </div>
        ) : (
          <div>{children}</div>
        )}
      </button>
    );
  }
);

export default Button;
