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

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const PROFILES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID!;
export const WATCHLIST_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_WATCHLISTS_COLLECTION_ID!;
export const WATCHLIST_ITEMS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_WATCHLIST_ITEMS_COLLECTION_ID!;
export const MEDIA_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_MEDIA_COLLECTION_ID!;
