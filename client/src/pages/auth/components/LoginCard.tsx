import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import InputText from "../../../components/InputText";

import { LoginSchema } from "../../../schemas/userSchema";
import { IAuthCard } from "../../../types/interfaces";
import { LoginProps } from "../../../types/types";

const LoginCard = ({ handleToggleCard }: IAuthCard) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
  });

  const isFormError: boolean =
    Boolean(errors?.email?.message) || Boolean(errors?.password?.message);
  const isAnyFieldEmpty: boolean = !watch("email") || !watch("password");

  const onSubmit = (data: LoginProps) => {
    console.log({ errors, data }, "err");
  };

  return (
    <motion.div
      className="w-4/6 px-11 py-7 glass-bg"
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      animate={{ opacity: 100 }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          field="email"
          label="Email"
          autoComplete="email"
          errorText={errors?.email?.message}
          {...register("email")}
        />
        <InputText
          field="password"
          label="Password"
          autoComplete="current-password"
          errorText={errors?.password?.message}
          passwordHelper
          {...register("password")}
        />
        <button
          type="submit"
          className="w-full my-5 bg-slate-700 disabled:bg-slate-300 hover:bg-gold disabled:hover:bg-slate-300 transition-all duration-700 text-xl font-bold font-body text-white p-3 rounded"
          disabled={isFormError || isAnyFieldEmpty}
        >
          Submit
        </button>
      </form>
      <p className="text-center text-white">
        Don't have an account?{" "}
        <span onClick={handleToggleCard} className="font-bold cursor-pointer">
          Register
        </span>
      </p>
    </motion.div>
  );
};

export default LoginCard;
