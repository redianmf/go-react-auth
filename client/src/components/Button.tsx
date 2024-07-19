import { ButtonHTMLAttributes, forwardRef } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | JSX.Element;
  classes?: string;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ children, disabled, classes, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`w-full my-5 transition-all duration-700 text-xl font-bold font-body text-white p-3 rounded  ${disabled ? "bg-slate-300 hover:bg-slate-300 cursor-not-allowed" : "bg-slate-700 hover:bg-gold"} ${classes}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
