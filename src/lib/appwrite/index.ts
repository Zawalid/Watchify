import { DATABASE_ID, USERS_COLLECTION_ID, WATCH_LIST_COLLECTION_ID } from '@/utils/constants';
import { createAdminClient, createSessionClient, setPermissions } from './config';
import bufferToBase64 from '@/utils/bufferToBase64';
import { ID } from 'node-appwrite';

export const getUser = async (): Promise<User | null> => {
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
};

export const saveUserInDb = async (account_id: string, avatar: string | null, watchlist: string | null) => {
  const { databases } = await createAdminClient();
  const user = await databases.createDocument(
    DATABASE_ID,
    USERS_COLLECTION_ID,
    ID.unique(),
    { account_id, avatar, watchlist },
    setPermissions(account_id)
  );
  return user;
};

export const createWatchList = async (user_id: string) => {
  const { databases } = await createAdminClient();
  const watchList = await databases.createDocument(
    DATABASE_ID,
    WATCH_LIST_COLLECTION_ID,
    ID.unique(),
    { user_id, items: [], visibility: 'private' },
    setPermissions(user_id)
  );
  return watchList;
};
