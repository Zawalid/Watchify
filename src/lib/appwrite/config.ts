import { Client, Account, Databases, Avatars, Locale, Users } from 'node-appwrite';
import { cookies } from 'next/headers';

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = (await cookies()).get('session');

  if (!session || !session.value) return { account: null };

  client.setSession(session.value);

  const locale = new Locale(client);
  const localeInfo = await locale.get();

  return {
    account: new Account(client),
    databases: new Databases(client),
    avatars: new Avatars(client),
    locale: localeInfo,
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    account: new Account(client),
    users: new Users(client),
  };
}

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;

export const getErrorMessage = (type: string): string => {
  switch (type) {
    // Already exists
    case 'user_already_exists':
    case 'user_email_already_exists':
    case 'user_phone_already_exists':
      return 'An account with this email already exists. Please try again with a different email.';
    // Invalid credentials
    case 'user_invalid_credentials':
      return 'Invalid email or password. Please try again.';
    // Password
    case 'password_recently_used':
      return 'The password you are trying to use is similar to your previous password. Please choose a different one and try again.';
    case 'password_personal_data':
      return 'The password you are trying to use contains personal information. Please choose a different one and try again.';
    // Unauthorized
    case 'user_unauthorized':
      return 'You are not authorized to perform this action';
    // Blocked
    case 'user_blocked':
      return 'Your account has been blocked. Please contact support.';
    // Not found
    case 'user_not_found':
    case 'user_identity_not_found':
      return 'The email you entered is not associated with an account. Please try again.';
    // Invalid token
    case 'user_invalid_token':
      return 'Invalid link or link expired. Please request a new one.';
    // Rate limit exceeded
    case 'general_rate_limit_exceeded':
    case 'user_count_exceeded':
      return 'You have made too many requests. Please wait a moment and try again.';
    // Network request failed
    case 'Network request failed':
      return 'Network request failed. Please check your internet connection.';
    default:
      return 'Something went wrong. Please try again.';
  }
};
