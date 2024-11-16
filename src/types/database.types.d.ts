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
    preferences: Preferences | null;
    $createdAt: string;
    $updatedAt: string;
  };

  declare type Preferences = {
    sign_out_confirmation?: 'enabled' | 'disabled';
    remove_from_watchlist_confirmation?: 'enabled' | 'disabled';
  };

  declare type Watchlist = {
    $id: string;
    visibility: 'private' | 'public';
    items: WatchlistItem[] | [];
    all: number;
    movies: number;
    tv: number;
    owner: Profile | null;
    $createdAt: string;
    $updatedAt: string;
  };

  declare type WatchlistItem = {
    $id: string;
    watchlist: string | null;
    media: Media;
    $createdAt: string;
    $updatedAt: string;
  };

  declare type Media = {
    $id: string;
    tmdb_id: number;
    title: string;
    media_type: 'movie' | 'tv';
    vote_average: number;
    poster_path: string | null;
    genre_ids: number[];
    release_date: string | null;
    $createdAt: string;
    $updatedAt: string;
  };
}
