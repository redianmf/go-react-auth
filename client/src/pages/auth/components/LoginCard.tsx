import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import Button from "../../../components/Button";
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
        <Button type="submit" disabled={isFormError || isAnyFieldEmpty}>
          Submit
        </Button>
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
