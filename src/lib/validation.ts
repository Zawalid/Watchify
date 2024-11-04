import { z } from 'zod';

export const credentials = {
  email: z
    .string()
    .min(1, { message: 'Please enter your email address' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(1, { message: 'Please enter your password' })
    .min(8, { message: 'Password must be more than 8 characters' })
    .max(32, { message: 'Password must be less than 32 characters' }),
};

export const signInSchema = z.object(credentials);

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Please enter your full name' })
    .min(3, { message: 'Full name must be at least 3 characters long' }),
  ...credentials,
});

export const resetPasswordSchema = z
  .object({
    password: credentials.password,
    confirm_password: credentials.password,
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match. Please check the password and confirm password.',
    path: ['confirm_password'],
  });
