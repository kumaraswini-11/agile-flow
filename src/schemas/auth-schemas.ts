import {z} from "zod";

const emailSchema = z
  .string()
  .trim()
  .email("Invalid email address")
  .min(1, {message: "Email address is required"})
  .max(255, {message: "Email address cannot exceed 255 characters"});

const passwordSchema = z
  .string()
  .trim()
  .min(1, {message: "Password must be at least 1 characters"})
  .max(128, {message: "Password cannot exceed 128 characters"});

export const SignInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {message: "Name is required"})
    .max(50, {message: "Name must be less than 50 characters"}),

  email: emailSchema,
  password: passwordSchema,
});
