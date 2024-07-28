import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useLogin from "../../../hooks/auth/useLogin";

import { FcGoogle } from "react-icons/fc";
import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import InputText from "../../../components/InputText";

import { LoginSchema } from "../../../schemas/userSchema";
import { IAuthCard } from "../../../types/interfaces";
import { AlertType, LoginProps } from "../../../types/types";

const LoginCard = ({ handleToggleCard }: IAuthCard) => {
  const { t } = useTranslation();
  const { handleLogin, isLoading, errorMsg } = useLogin();

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

  const onSubmit = async (data: LoginProps) => {
    await handleLogin(data);
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
          autoComplete="current-password"
          errorText={errors?.password?.message}
          passwordHelper
          {...register("password")}
        />
        <Button
          data-testid="submit-login"
          type="submit"
          disabled={isFormError || isAnyFieldEmpty}
          isLoading={isLoading}
        >
          {t("auth.submit")}
        </Button>
      </form>
      {errorMsg && <Alert type={AlertType.ERROR} message={errorMsg} />}
      <p className="text-center text-white mt-2">
        {t("auth.noAccount")}{" "}
        <span
          onClick={handleToggleCard}
          data-testid="switch-to-register"
          className="font-bold cursor-pointer"
        >
          {t("auth.register")}
        </span>
      </p>
      <div className="separator text-gold my-2">OR</div>
      <Button data-testid="google-login" disabled={false} isLoading={isLoading}>
        <div className="flex justify-center items-center gap-3">
          <FcGoogle className="text-3xl" />
          {t("auth.loginGoogle")}
        </div>
      </Button>
    </motion.div>
  );
};

export default LoginCard;
