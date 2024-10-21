declare type Item = {
  id: number;
  name: string;
  original_name: string;
  media_type: "movie" | "tv";
  vote_average: number;
  poster_path: string;
  user_id?: string;
};

declare type Suggestion = {
  suggestedTo: string;
  suggestedBy: string;
  suggestion: {
    type: "movie" | "tv";
    id: string;
  };
};

// Navbar
type Link = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

declare type Links = {
  authenticated: Link[];
  unauthenticated: Link[];
};

// Input
declare type IconType =
  | "fullName"
  | "email"
  | "search"
  | "password"
  | "visible"
  | "invisible"
  | "title"
  | "link";

// TMDB Api
declare type SearchResponse = {
  page: number;
  results: Item[];
  total_pages: number;
  total_results: number;
};

// API
declare type WatchList = {
  watchList: Item[];
  all: number;
  movies: number;
  tv: number;
};
