// appwrite-types.d.ts
import { Models } from 'node-appwrite';

declare global {
  interface User extends Models.User<Models.Preferences> {
    account_id: string;
    avatar: string | null;
    initialsAvatar: string | null;
    locale: Models.Locale;
  }
}
