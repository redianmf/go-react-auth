import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useRegister from "../../../hooks/auth/useRegister";

import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import InputText from "../../../components/InputText";

import { RegisterSchema } from "../../../schemas/userSchema";
import { IAuthCard } from "../../../types/interfaces";
import { AlertType, RegisterProps } from "../../../types/types";

const RegisterCard = ({ handleToggleCard }: IAuthCard) => {
  const { t } = useTranslation();
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

  const isFormError: boolean = Boolean(Object.keys(errors).length !== 0);
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
      className="w-4/6 px-11 py-7 glass-bg max-h-[calc(100vh-50px)] overflow-y-auto"
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      animate={{ opacity: 100 }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-3xl text-gold text-center font-bold font-body my-3">
          {t("auth.register")}
        </h3>
        <InputText
          data-testid="name"
          field="name"
          label={t("auth.name")}
          autoComplete="name"
          errorText={errors?.name?.message}
          {...register("name")}
        />
        <InputText
          data-testid="email"
          field="email"
          label={t("auth.email")}
          autoComplete="email"
          errorText={errors?.email?.message}
          {...register("email")}
        />
        <InputText
          data-testid="password"
          field="password"
          label={t("auth.password")}
          passwordHelper
          autoComplete="new-password"
          errorText={errors?.password?.message}
          {...register("password")}
        />
        <InputText
          data-testid="confirm-password"
          field="confirmPassword"
          label={t("auth.confirmPassword")}
          passwordHelper
          autoComplete="new-password"
          errorText={errors?.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button
          data-testid="submit-register"
          type="submit"
          disabled={isFormError || isAnyFieldEmpty}
          isLoading={isLoading}
        >
          {t("auth.submit")}
        </Button>
        {errorMsg && <Alert type={AlertType.ERROR} message={errorMsg} />}
        {successMsg && (
          <Alert
            data-testid="success-register"
            type={AlertType.SUCCESS}
            message={successMsg}
          />
        )}
        <p className="text-center text-white mt-2">
          {t("auth.haveAccount")}{" "}
          <span
            data-testid="switch-to-login"
            onClick={handleToggleCard}
            className="font-bold cursor-pointer"
          >
            {t("auth.login")}
          </span>
        </p>
      </form>
    </motion.div>
  );
};

export default RegisterCard;
