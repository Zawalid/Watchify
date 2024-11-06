/*
 * This Appwrite function is meant to be executed every time a watchlist is updated
  * 1. Count the number of items in the watchlist and affect it to the `all` field
  * 2. Count the number of movies in the watchlist and affect it to the `movies` field
  * 3. Count the number of TV shows in the watchlist and affect it to the `tv` field

  */

import { Client, Databases, Users } from 'node-appwrite';

const DATABASE_ID = process.env.DATABASE_ID ?? '6727f7f10026c41951ee';
const WATCHLISTS_COLLECTION_ID = process.env.WATCHLISTS_COLLECTION_ID ?? '672958cf00155f79db8c';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');

  const databases = new Databases(client);

  try {
    const watchlistId = req.body.watchlist.$id;
    const watchlist = await databases.getDocument(DATABASE_ID, WATCHLISTS_COLLECTION_ID, watchlistId);

    const all = watchlist.items.length;
    const movies = watchlist.items.filter((item) => item.media.media_type === 'movie').length;
    const tv = watchlist.items.filter((item) => item.media.media_type === 'tv').length;
    log({ all, movies, tv });

    const res = await databases.updateDocument(DATABASE_ID, WATCHLISTS_COLLECTION_ID, watchlistId, { all, movies, tv });

    log({ updatedWatchlist: res });
  } catch (error) {}

  return res.empty();
};
