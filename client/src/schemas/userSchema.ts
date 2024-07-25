import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

z.setErrorMap(makeZodI18nMap({ ns: "zod" }));

const uppercaseValidation = new RegExp(/[A-Z]/);
const lowercaseValidation = new RegExp(/[a-z]/);
const numberValidation = new RegExp(/[0-9]/);
const emailValidation = z.string().email();
const passwordValidation = z
  .string()
  .min(6)
  .max(64)
  .regex(uppercaseValidation, {
    message: "Password must contain at least 1 uppercase",
  })
  .regex(lowercaseValidation, {
    message: "Password must contain at least 1 lowercase",
  })
  .regex(numberValidation, {
    message: "Password must contain at least 1 number",
  });

export const LoginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const RegisterSchema = z
  .object({
    name: z.string().min(2),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password did not match",
        path: ["confirmPassword"],
      });
    }
  });
