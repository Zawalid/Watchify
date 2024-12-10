'use server';

import { getUser } from '@/lib/appwrite';
import { createSessionClient, DATABASE_ID, getErrorMessage, PROFILES_COLLECTION_ID } from '@/lib/appwrite/config';
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
  const { account, database } = await createSessionClient();
  const user = await getUser();

  if (!account || !user) return { message: 'Something went wrong. Please try again later.' };

  try {
    await account.updateEmail(email, password);
    await database.updateDocument(DATABASE_ID, PROFILES_COLLECTION_ID, user.$id, { email });
    revalidatePath('/settings/account');
    // TODO : Uncomment this line
    // sendVerificationEmail();
  } catch (error) {
    console.error(error);
    return { message: getErrorMessage((error as AppwriteException).type), type: (error as AppwriteException).type };
  }
};

export const updateName = async (name: string) => {
  const { account, database } = await createSessionClient();
  const user = await getUser();

  if (!account || !user) return { message: 'Something went wrong. Please try again later.' };

  try {
    await account.updateName(name);
    await database.updateDocument(DATABASE_ID, PROFILES_COLLECTION_ID, user.$id, { name });
    revalidatePath('/settings/account');
  } catch (error) {
    console.error(error);
    return { message: getErrorMessage((error as AppwriteException).type), type: (error as AppwriteException).type };
  }
};

export const updateProfile = async (data: Partial<Profile>, updated: string[]) => {
  const { database } = await createSessionClient();
  const user = await getUser();

  if (!user || !database) return { message: 'Something went wrong. Please try again later.' };

  try {
    if (updated.includes('name')) await updateName(data.name || '');

    if (updated.filter((key) => key !== 'name').length) {
      const { name, ...rest } = data;
      await database.updateDocument(DATABASE_ID, PROFILES_COLLECTION_ID, user.$id, rest);
    }

    revalidatePath('/settings/account');
  } catch (error) {
    console.error(error);
    return { message: getErrorMessage((error as AppwriteException).type), type: (error as AppwriteException).type };
  }
};

export const updatePassword = async (password: string, newPassword: string) => {
  const { account } = await createSessionClient();

  if (!account) return { message: 'Something went wrong. Please try again later.' };

  try {
    await account.updatePassword(newPassword, password);
  } catch (error) {
    console.error(error);
    return { message: getErrorMessage((error as AppwriteException).type), type: (error as AppwriteException).type };
  }
};
