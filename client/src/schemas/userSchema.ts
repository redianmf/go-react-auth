import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

z.setErrorMap(makeZodI18nMap({ ns: "zod" }));

const emailValidation = z.string().email();
const passwordBaseValidation = z.string().min(6).max(64);
const passwordAdditionalValidation = z.string().superRefine((val, ctx) => {
  const uppercasePattern = /[A-Z]/;
  const lowercasePattern = /[a-z]/;
  const numberPattern = /[0-9]/;

  if (!uppercasePattern.test(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      params: { i18n: "custom.uppercase" },
    });
  }

  if (!lowercasePattern.test(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      params: { i18n: "custom.lowercase" },
    });
  }

  if (!numberPattern.test(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      params: { i18n: "custom.contain-number" },
    });
  }
});

const passwordValidation = z.intersection(
  passwordBaseValidation,
  passwordAdditionalValidation
);

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
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        params: { i18n: "custom.password_not_match" },
      });
    }
  });
