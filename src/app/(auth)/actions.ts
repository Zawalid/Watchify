'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { signInSchema, signUpSchema } from '@/lib/validation';
import { AuthResponse, AuthTokenResponsePassword } from '@supabase/supabase-js';

type FormError = {
  email?: string[];
  password?: string[];
  full_name?: string[];
  message?: string;
};

const getCustomErrorMessage = (code: string) => {
  switch (code) {
    case 'invalid_credentials':
      return "We can't find an account with that email and password. Please try again.";
    case 'email_not_confirmed':
      return 'Please confirm your email before signing in.';
    case 'user_already_exists':
      return 'User already exists. Please try again.';
    default:
      return 'Something went wrong';
  }
};

const authAction = async (formData: FormData, type: 'signin' | 'signup'): Promise<FormError | undefined> => {
  const supabase = await createClient();
  const data = Object.fromEntries(formData);

  const validated = await (type === 'signin' ? signInSchema : signUpSchema).safeParseAsync(data);
  if (!validated.success) return validated.error.formErrors.fieldErrors;

  const { data: user, error } =
    type === 'signin'
      ? await supabase.auth.signInWithPassword(validated.data)
      : await supabase.auth.signUp({
          ...validated.data,
          options: {
            data: { full_name: (validated.data as { email: string; password: string; full_name: string }).full_name },
          },
        });
  console.log(user);
  console.log('Error code : ==== ' + error?.code);
  console.log('Error message : ==== ' + error?.message);

  if (error) return { message: getCustomErrorMessage(error.code as string) };

  redirect('/');
};

export const signInAction = async (_: any, formData: FormData) => await authAction(formData, 'signin');

export const signUpAction = async (_: any, formData: FormData) => await authAction(formData, 'signup');

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
};

export const signInWithGoogleAction = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  });
  console.log(data);
  console.log(error);
  if (data.url) {
    redirect(data.url);
  }
};
