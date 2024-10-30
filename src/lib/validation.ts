import { z } from "zod";

const credentials = {
  email: z
    .string({ required_error: "Please enter your email address" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string({ required_error: "Please enter your password" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
};

export const signInSchema = z.object(credentials);

export const signUpSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters long" }),
  ...credentials,
});
