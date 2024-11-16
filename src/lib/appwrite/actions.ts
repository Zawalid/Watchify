'use server';

import { DATABASE_ID, WATCHLISTS_ITEMS_COLLECTION_ID } from './config';
import { createSessionClient } from './config';
import {
  createMedia,
  createWatchlistItem,
  getWatchlist,
  getWatchlistItem,
  updatePreferences,
  updateWatchlistItemsCount,
} from '.';
import { revalidatePath } from 'next/cache';

export const addItemToWatchlist = async (media: Movie | TvShow) => {
  try {
    const { database } = await createSessionClient();
    const watchlist = await getWatchlist();
    const mediaItem = await createMedia(media);

    const existingItem = watchlist?.items.find((item) => item.media.tmdb_id === mediaItem?.tmdb_id);
    if (existingItem) return existingItem as unknown as WatchlistItem;

    if (!database || !watchlist || !mediaItem) throw new Error('Failed to add the item');

    await createWatchlistItem(watchlist.$id, mediaItem.$id);
    await updateWatchlistItemsCount();
    revalidatePath('/watchList');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeItemFromWatchlist = async (tmdb_id: number, confirmation?: 'enabled' | 'disabled') => {
  try {
    const { database } = await createSessionClient();
    if (!database) throw new Error('Something went wrong');

    const watchlistItem = await getWatchlistItem(tmdb_id);
    if (!watchlistItem) throw new Error('Failed to remove the item');

    await database?.deleteDocument(DATABASE_ID, WATCHLISTS_ITEMS_COLLECTION_ID, watchlistItem?.$id);
    await updateWatchlistItemsCount();
    revalidatePath('/watchList');
    await updatePreferences('remove_from_watchlist_confirmation', confirmation);
  } catch (error) {
    console.error(error);
    return null;
  }
};
