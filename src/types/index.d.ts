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
  | "link" ;


declare type TMDBResponse = {
  page: number;
  results: TvShow[] | Movie[];
  total_pages: number;
  total_results: number;
};

declare type WatchList = {
  watchList: TvShow[] | Movie[];
  all: number;
  movies: number;
  tv: number;
};
