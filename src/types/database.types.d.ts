import { Models } from 'node-appwrite';

declare global {
  declare type Profile = {
    $id: string;
    account_id: string;
    name: string;
    email: string;
    avatar: string | null;
    initialsAvatar: string | null;
    locale: Models.Locale;
    watchlist: Watchlist | null;
    $createdAt: string;
    $updatedAt: string;
  };

  declare type Watchlist = {
    $id: string;
    visibility: 'private' | 'public';
    items: WatchlistItem[] | [];
    owner: Profile | null;
    $createdAt: string;
    $updatedAt: string;
  };

  declare type WatchlistItem = {
    $id: string;
    watchlist_id: string | null;
    media_id: Media | null;
    $createdAt: string;
    $updatedAt: string;
  };

  declare type Media = {
    $id: string;
    tmdb_id: string;
    title: string;
    media_type: 'movie' | 'tv';
    vote_average: number;
    poster_path: string | null;
    genre_ids: number[] | null;
    release_date: string | null;
    $createdAt: string;
    $updatedAt: string;
  };
}
