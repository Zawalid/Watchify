import {
  DATABASE_ID,
  MEDIA_COLLECTION_ID,
  PROFILES_COLLECTION_ID,
  WATCHLIST_COLLECTION_ID,
  WATCHLIST_ITEMS_COLLECTION_ID,
} from '@/utils/constants';
import { createSessionClient } from './config';
import bufferToBase64 from '@/utils/bufferToBase64';
import { ID, Query } from 'node-appwrite';

export const getUser = async (): Promise<Profile | null> => {
  try {
    const { account, database, locale, avatars } = await createSessionClient();
    if (!account || !database) throw new Error('Something went wrong');

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
      preferences: {
        sign_out_confirmation: 'enabled',
        ...user.prefs,
      },
      $createdAt,
      $updatedAt,
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

    const watchList = (await database.listDocuments(DATABASE_ID, WATCHLIST_COLLECTION_ID)).documents[0];
    const { $id, visibility, items, all, movies, tv, owner, $createdAt, $updatedAt } = watchList;
    return { $id, visibility, items, all, movies, tv, owner, $createdAt, $updatedAt };
  } catch (error) {
    console.error(error);
    return null;
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
    return null;
  }
};

export const createWatchlistItem = async (watchlistId: string, mediaId: string): Promise<WatchlistItem | null> => {
  try {
    const { database } = await createSessionClient();
    if (!database) throw new Error('Something went wrong');

    const watchlistItem = await database.createDocument(DATABASE_ID, WATCHLIST_ITEMS_COLLECTION_ID, ID.unique(), {
      watchlist: watchlistId,
      media: mediaId,
    });
    return watchlistItem as unknown as WatchlistItem;
  } catch (error) {
    console.error(error);
    return null;
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
      await database?.listDocuments(DATABASE_ID, WATCHLIST_ITEMS_COLLECTION_ID, [
        Query.equal('watchlist', watchlist.$id),
        Query.equal('media', media.$id),
      ])
    )?.documents[0];

    return watchlistItem as unknown as WatchlistItem;
  } catch (error) {
    console.error(error);
    return null;
  }
};
