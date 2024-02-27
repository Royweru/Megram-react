import * as z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, { message: "Too short" }),
  email: z.string().email().min(1),
  password: z
    .string()
    .min(8, { message: "Must at least have a minimum 8 characters" }),
  username: z.string().min(1, {
    message: "Too short must have a minimum of 2 characters",
  }),
});
export const signInSchema = z.object({
  email: z.string().email().min(1),
  password: z
    .string()
    .min(8, { message: "Must at least have a minimum 8 characters" }),
});
