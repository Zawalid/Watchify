'use server';

import { DATABASE_ID, MEDIA_COLLECTION_ID, WATCHLIST_ITEMS_COLLECTION_ID } from '@/utils/constants';
import { createSessionClient } from './config';
import { ID, Query } from 'node-appwrite';
import { createMedia, createWatchlistItem, getWatchlist, getWatchlistItem } from '.';

export const addItemToWatchlist = async (media: Movie | TvShow): Promise<WatchlistItem | null> => {
  try {
    const { database } = await createSessionClient();
    const watchlist = await getWatchlist();
    const mediaItem = await createMedia(media);

    const existingItem = watchlist?.items.find((item) => item.media.tmdb_id === mediaItem?.tmdb_id);
    if (existingItem) return existingItem as unknown as WatchlistItem;

    if (!database || !watchlist || !mediaItem) throw new Error('Failed to add the item');

    return await createWatchlistItem(watchlist.$id, mediaItem.$id);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeItemFromWatchlist = async (tmdb_id: number, confirmation?: 'enabled' | 'disabled') => {
  try {
    const { database } = await createSessionClient();
    if (!database) throw new Error('Something went wrong');

    const watchlistItem = await getWatchlistItem(tmdb_id);
    if (!watchlistItem) throw new Error('Failed to remove the item');

    await database?.deleteDocument(DATABASE_ID, WATCHLIST_ITEMS_COLLECTION_ID, watchlistItem?.$id);
  } catch (error) {
    console.error(error);
    return null;
  }
};
