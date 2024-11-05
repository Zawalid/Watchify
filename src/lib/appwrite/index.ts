import { DATABASE_ID, PROFILES_COLLECTION_ID, WATCHLIST_COLLECTION_ID } from '@/utils/constants';
import { createAdminClient, createSessionClient, setPermissions } from './config';
import bufferToBase64 from '@/utils/bufferToBase64';

export const getUser = async (): Promise<Profile | null> => {
  try {
    const { account, database, locale, avatars } = await createSessionClient();
    if (!account) return null;

    const user = await account.get();
    const initialsAvatar = await avatars.getInitials(user.name);
    const profile = (await database.listDocuments(DATABASE_ID, PROFILES_COLLECTION_ID)).documents[0];
    const { $id, name, email, avatar, watchlist, $createdAt, $updatedAt } = profile;

    const updatedProfile: Profile = {
      $id,
      account_id: user.$id,
      name,
      email,
      avatar,
      initialsAvatar: bufferToBase64(initialsAvatar),
      locale,
      watchlist,
      $createdAt,
      $updatedAt,
    };

    return updatedProfile;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getWatchlist = async () => {
  const { database } = await createSessionClient();
  if (!database) return null;
  try {
    const watchList = (await database.listDocuments(DATABASE_ID, WATCHLIST_COLLECTION_ID)).documents[0];
    return watchList;
  } catch (error) {
    console.error(error);
    return null;
  }
};
