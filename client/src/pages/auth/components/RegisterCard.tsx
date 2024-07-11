import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import InputText from "../../../components/InputText";

import { RegisterSchema } from "../../../schemas/userSchema";
import { IAuthCard } from "../../../types/interfaces";
import { RegisterProps } from "../../../types/types";

const RegisterCard = ({ handleToggleCard }: IAuthCard) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterProps>({
    resolver: zodResolver(RegisterSchema),
    mode: "all",
  });

  const isFormError: boolean = Boolean(errors?.name?.message);
  Boolean(errors?.email?.message) ||
    Boolean(errors?.password?.message) ||
    Boolean(errors?.confirmPassword?.message);
  const isAnyFieldEmpty: boolean =
    !watch("name") ||
    !watch("email") ||
    !watch("password") ||
    !watch("confirmPassword");

  const onSubmit = (data: RegisterProps) => {
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
        <h3 className="text-3xl text-gold text-center font-bold font-body my-3">
          Register
        </h3>
        <InputText
          field="name"
          label="Your name"
          autoComplete="name"
          errorText={errors?.name?.message}
          {...register("name")}
        />
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
          passwordHelper
          autoComplete="new-password"
          errorText={errors?.password?.message}
          {...register("password")}
        />
        <InputText
          field="confirmPassword"
          label="Confirm Password"
          passwordHelper
          autoComplete="new-password"
          errorText={errors?.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <button
          type="submit"
          className="w-full my-5 bg-slate-700 disabled:bg-slate-300 hover:bg-gold disabled:hover:bg-slate-300 transition-all duration-700 text-xl font-bold font-body text-white p-3 rounded"
          disabled={isFormError || isAnyFieldEmpty}
        >
          Submit
        </button>
        <p className="text-center text-white">
          Already have an account?{" "}
          <span onClick={handleToggleCard} className="font-bold cursor-pointer">
            Login
          </span>
        </p>
      </form>
    </motion.div>
  );
};

export default RegisterCard;
