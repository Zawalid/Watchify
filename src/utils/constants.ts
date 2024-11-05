export const COOKIE_OPTIONS: {
  path: string;
  httpOnly: boolean;
  sameSite: boolean | 'lax' | 'strict' | 'none' | undefined;
  secure: boolean;
} = {
  path: '/',
  httpOnly: true,
  sameSite: 'strict',
  secure: true,
};

export const BASE_URL =
  process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000';

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;
export const WATCH_LIST_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_WATCH_LIST_COLLECTION_ID!;
export const WATCH_LIST_ITEMS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_WATCH_LIST_ITEMS_COLLECTION_ID!;
export const MEDIA_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_MEDIA_COLLECTION_ID!;
