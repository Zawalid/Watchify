import { z } from 'zod';

const credentials = {
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
  full_name: z
    .string()
    .min(1, { message: 'Please enter your full name' })
    .min(3, { message: 'Full name must be at least 3 characters long' }),
  ...credentials,
});
