import { z } from "zod";

const uppercaseValidation = new RegExp(/[A-Z]/);
const lowercaseValidation = new RegExp(/[a-z]/);
const numberValidation = new RegExp(/[0-9]/);
const emailValidation = z.string().email({ message: "Invalid email address" });
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
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Password didn't match",
  });
