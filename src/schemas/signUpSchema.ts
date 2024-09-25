import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username Must be Atleast 2 char")
  .max(20, "Username must be no more than 20 char")
  .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special character");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
