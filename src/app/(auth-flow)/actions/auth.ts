'use server';

import { type AppwriteException, ID, OAuthProvider } from 'node-appwrite';
import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';
import { createAdminClient, createSessionClient, getErrorMessage } from '@/lib/appwrite/config';
import { signInSchema, signUpSchema } from '@/lib/validation';
import { COOKIE_OPTIONS } from '@/utils/constants';

// Validate form data
const validate = async (formData: FormData, type: 'signin' | 'signup') => {
  const data = Object.fromEntries(formData);

  const validated = await (type === 'signin' ? signInSchema : signUpSchema).safeParseAsync(data);

  if (!validated.success) return { data: null, error: validated.error.formErrors.fieldErrors };

  return { data: validated.data, error: null };
};

// Create a session
const createSession = async (email: string, password: string) => {
  const { account } = await createAdminClient();
  let session;
  try {
    session = await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error(error);
    return { message: getErrorMessage((error as AppwriteException).type) };
  }

  (await cookies()).set('session', session.secret, COOKIE_OPTIONS);

  redirect('/');
};

// Sign in action
export const signInAction = async (_: any, formData: FormData): Promise<FormError | undefined> => {
  const { data, error } = await validate(formData, 'signin');
  console.log(error);
  if (error) return error;

  return await createSession(data.email, data.password);
};

// Sign up action
export const signUpAction = async (_: any, formData: FormData): Promise<FormError | undefined> => {
  const { account } = await createAdminClient();
  const { data, error } = await validate(formData, 'signup');

  if (error) return error;

  const { email, password, name } = data as { email: string; password: string; name: string };

  try {
    // Create the account (appwrite auth)
    await account.create(ID.unique(), email, password, name);
  } catch (error) {
    console.error(error);
    return { message: getErrorMessage((error as AppwriteException).type) };
  }
  return await createSession(email, password);
};

// Sign out action
export const signOutAction = async () => {
  const { account } = await createSessionClient();

  if (!account) return;

  try {
    (await cookies()).delete('session');
    await account.deleteSession('current');
    redirect('/signin');
  } catch (error) {
    console.error(error);
  }
};

// Sign in with Google action
export const signInWithGoogleAction = async (path: '/signin' | '/signup') => {
  const { account } = await createAdminClient();
  const origin = (await headers()).get('origin');

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/auth/callback`,
    `${origin}${path}`,
    ['email', 'profile', 'openid']
  );

  redirect(redirectUrl);
};
