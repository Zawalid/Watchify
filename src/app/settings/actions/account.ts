'use server';

import { createSessionClient, getErrorMessage } from '@/lib/appwrite/config';
import { getUrl } from '@/utils';
import { revalidatePath } from 'next/cache';
import { AppwriteException } from 'node-appwrite';

export const sendVerificationEmail = async (): Promise<FormError | undefined> => {
  const { account } = await createSessionClient();

  if (!account) return { message: 'Something went wrong. Please try again later.' };

  try {
    await account.createVerification(`${getUrl()}/verify-email`);
  } catch (error) {
    console.error(error);
    return { message: getErrorMessage((error as AppwriteException).type) };
  }
};

export const updateEmail = async (email: string, password: string) => {
  const { account } = await createSessionClient();

  if (!account) return { message: 'Something went wrong. Please try again later.' };

  try {
    await account.updateEmail(email, password);
    revalidatePath('/settings/account');
    sendVerificationEmail();
  } catch (error) {
    console.error(error);
    return { message: getErrorMessage((error as AppwriteException).type), type: (error as AppwriteException).type };
  }
};
