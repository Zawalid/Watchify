'use server';

import { DATABASE_ID, MEDIA_COLLECTION_ID, WATCHLIST_ITEMS_COLLECTION_ID } from '@/utils/constants';
import { createSessionClient } from './config';
import { ID } from 'node-appwrite';
import { getWatchlist } from '.';

const createMediaItem = async (media: Movie | TvShow): Promise<Media | null> => {
  const { database } = await createSessionClient();
  if (!database) return null;

  const { id, genre_ids, poster_path, vote_average, media_type } = media;
  const { title, release_date } = media as Movie;
  const { original_name, first_air_date } = media as TvShow;
  try {
    const mediaList = (await database.listDocuments(DATABASE_ID, MEDIA_COLLECTION_ID)).documents;
    const existingMedia = mediaList.find((item) => item.tmdb_id === id);
    if (existingMedia) return existingMedia as unknown as Media;

    const data: Omit<Media, '$id' | '$createdAt' | '$updatedAt'> = {
      tmdb_id: id,
      title: title || original_name,
      media_type: (media_type ?? (media as Movie).release_date) ? 'movie' : 'tv',
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

export const addWatchlistItem = async (media: Movie | TvShow): Promise<WatchlistItem | null> => {
  const { database } = await createSessionClient();

  try {
    const watchlist = await getWatchlist();
    const mediaItem = await createMediaItem(media);

    const existingItem = watchlist?.items.find((item) => item.media.tmdb_id === mediaItem?.tmdb_id);
    if (existingItem) return existingItem as unknown as WatchlistItem;

    if (!database || !watchlist || !mediaItem) return null;

    const data = { watchlist: watchlist.$id, media: mediaItem.$id };
    const watchlistItem = await database.createDocument(DATABASE_ID, WATCHLIST_ITEMS_COLLECTION_ID, ID.unique(), data);
    return watchlistItem as unknown as WatchlistItem;
  } catch (error) {
    console.error(error);
    return null;
  }
};
