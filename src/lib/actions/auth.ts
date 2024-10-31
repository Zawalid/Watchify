'use server';

import { signIn, signOut } from '@/lib/auth';
import { signInSchema, signUpSchema } from '@/lib/validation';
import { createUser } from '../api';
import { redirect } from 'next/navigation';

type FormError = {
  email?: string[];
  password?: string[];
  full_name?: string[];
  message?: string;
};

const authAction = async (
  validationSchema: any,
  formData: FormData,
  action: (data: any) => Promise<{ data: any; error: { message: string } | null }>
): Promise<FormError | undefined> => {
  const data = Object.fromEntries(formData);
  const validated = await validationSchema.safeParseAsync(data);
  if (!validated.success) return validated.error.formErrors.fieldErrors;

  const { error } = await action(validated.data);
  if (error) return { message: error.message };
  redirect('/');
};

export const signUpAction = async (_: any, formData: FormData): Promise<FormError | undefined> => {
  return await authAction(signUpSchema, formData, createUser);
};

export const signInAction = async (_: any, formData: FormData): Promise<FormError | undefined> => {
  return await authAction(signInSchema, formData, signIn);
};

export const signInWithGoogle = async () => await signIn('google', { redirectTo: '/' });

export const signOutAction = async () => await signOut({ redirectTo: '/' });
