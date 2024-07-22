import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useRegister from "../../../hooks/auth/useRegister";

import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import InputText from "../../../components/InputText";

import { RegisterSchema } from "../../../schemas/userSchema";
import { IAuthCard } from "../../../types/interfaces";
import { AlertType, RegisterProps } from "../../../types/types";

const RegisterCard = ({ handleToggleCard }: IAuthCard) => {
  const { handleRegister, isLoading, errorMsg, successMsg } = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    reset,
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

  const onSubmit = async (data: RegisterProps) => {
    await handleRegister(data);
  };

  useEffect(() => {
    if (successMsg) reset();
  }, [successMsg]);

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
        <Button
          type="submit"
          disabled={isFormError || isAnyFieldEmpty}
          isLoading={isLoading}
        >
          Submit
        </Button>
        {errorMsg && <Alert type={AlertType.ERROR} message={errorMsg} />}
        {successMsg && <Alert type={AlertType.SUCCESS} message={successMsg} />}
        <p className="text-center text-white mt-2">
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
