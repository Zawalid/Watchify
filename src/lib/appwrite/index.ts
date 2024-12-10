import {
  DATABASE_ID,
  MEDIA_COLLECTION_ID,
  PROFILES_COLLECTION_ID,
  WATCHLISTS_COLLECTION_ID,
  WATCHLISTS_ITEMS_COLLECTION_ID,
} from './config';
import { createSessionClient } from './config';
import bufferToBase64 from '@/utils/bufferToBase64';
import { ID, Query } from 'node-appwrite';

export const getUser = async (): Promise<Profile | null> => {
  try {
    const { account, database, locale, avatars } = await createSessionClient();
    if (!account || !database) return null;

    const { $id: account_id, name, email, prefs, emailVerification } = await account.get();
    const initialsAvatar = await avatars.getInitials(name);
    const profile = (await database.listDocuments(DATABASE_ID, PROFILES_COLLECTION_ID)).documents[0];
    const { $id, avatar, watchlist, bio, preference, $createdAt, $updatedAt } = profile;

    const updatedProfile: Profile = {
      $id,
      account_id,
      name,
      email,
      avatar,
      bio,
      preference,
      initialsAvatar: bufferToBase64(initialsAvatar),
      locale,
      watchlist,
      preferences: { sign_out_confirmation: 'enabled', ...prefs },
      $createdAt,
      $updatedAt,
      emailVerification,
    };

    return updatedProfile;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getWatchlist = async (): Promise<Watchlist | null> => {
  try {
    const { database } = await createSessionClient();
    if (!database) throw new Error('Something went wrong');

    const watchList = (await database.listDocuments(DATABASE_ID, WATCHLISTS_COLLECTION_ID)).documents[0];
    const { $id, visibility, items, all, movies, tv, owner, $createdAt, $updatedAt } = watchList;
    return { $id, visibility, items, all, movies, tv, owner, $createdAt, $updatedAt };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWatchlistItem = async (tmdb_id: number): Promise<WatchlistItem | null> => {
  try {
    const { database } = await createSessionClient();
    if (!database) throw new Error('Something went wrong');

    const watchlist = await getWatchlist();
    const media = (await database?.listDocuments(DATABASE_ID, MEDIA_COLLECTION_ID, [Query.equal('tmdb_id', tmdb_id)]))
      ?.documents[0];

    if (!media || !watchlist) throw new Error('Media not found');

    const watchlistItem = (
      await database?.listDocuments(DATABASE_ID, WATCHLISTS_ITEMS_COLLECTION_ID, [
        Query.equal('watchlist', watchlist.$id),
        Query.equal('media', media.$id),
      ])
    )?.documents[0];

    return watchlistItem as unknown as WatchlistItem;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createWatchlistItem = async (watchlistId: string, mediaId: string): Promise<WatchlistItem | null> => {
  try {
    const { database } = await createSessionClient();
    if (!database) throw new Error('Something went wrong');

    const watchlistItem = await database.createDocument(DATABASE_ID, WATCHLISTS_ITEMS_COLLECTION_ID, ID.unique(), {
      watchlist: watchlistId,
      media: mediaId,
    });
    return watchlistItem as unknown as WatchlistItem;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateWatchlistItemsCount = async () => {
  try {
    const { database } = await createSessionClient();
    const watchlist = await getWatchlist();

    if (!database || !watchlist) throw new Error('Something went wrong');

    const all = watchlist.items.length;
    const movies = watchlist.items.filter((item) => item.media.media_type === 'movie').length;
    const tv = watchlist.items.filter((item) => item.media.media_type === 'tv').length;

    await database.updateDocument(DATABASE_ID, WATCHLISTS_COLLECTION_ID, watchlist.$id, { all, movies, tv });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createMedia = async (media: Movie | TvShow): Promise<Media | null> => {
  try {
    const { database } = await createSessionClient();
    if (!database) return null;

    const { id, genre_ids, poster_path, vote_average, media_type } = media;
    const { title, release_date } = media as Movie;
    const { name, first_air_date } = media as TvShow;

    const mediaList = (await database.listDocuments(DATABASE_ID, MEDIA_COLLECTION_ID)).documents;
    const existingMedia = mediaList.find((item) => item.tmdb_id === id);
    if (existingMedia) return existingMedia as unknown as Media;

    const data: Omit<Media, '$id' | '$createdAt' | '$updatedAt'> = {
      tmdb_id: id,
      title: title || name,
      media_type: media_type,
      vote_average,
      poster_path: `http://image.tmdb.org/t/p/w500${poster_path}`,
      genre_ids,
      release_date: release_date || first_air_date,
    };
    const mediaItem = await database.createDocument(DATABASE_ID, MEDIA_COLLECTION_ID, ID.unique(), data);
    return mediaItem as unknown as Media;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePreferences = async (key: keyof Preferences, value?: string) => {
  try {
    const { account } = await createSessionClient();
    const user = await getUser();

    if (!account || !user) return;

    if (value && user?.preferences?.[key] !== value) await account.updatePrefs({ [key]: value });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
