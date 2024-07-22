import { z } from "zod";
import { LoginSchema, RegisterSchema } from "../schemas/userSchema";

export type LoginProps = z.infer<typeof LoginSchema>;
export type RegisterProps = z.infer<typeof RegisterSchema>;

export enum AlertType {
  SUCCESS,
  WARNING,
  ERROR,
}
