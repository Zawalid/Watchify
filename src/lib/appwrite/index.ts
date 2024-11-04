import { Query, Locale } from 'node-appwrite';
import { createSessionClient, DATABASE_ID, USERS_COLLECTION_ID } from './config';
import bufferToBase64 from '@/utils/bufferToBase64';

export async function getUser(): Promise<User | null> {
  try {
    const { account, locale, avatars } = await createSessionClient();
    if (!account) return null;
    const user = await account.get();

    const initialsAvatar = await avatars.getInitials(user.name);

    // const user = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [Query.equal('account_id', acc.$id)]);
    return {
      ...user,
      initialsAvatar: bufferToBase64(initialsAvatar),
      locale,
      avatar: null,
      account_id: '67djsdsd',
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
