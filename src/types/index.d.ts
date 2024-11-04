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
declare type IconType = 'name' | 'email' | 'search' | 'password' | 'visible' | 'invisible' | 'title' | 'link';

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

declare type FormError = {
  email?: string[];
  password?: string[];
  name?: string[];
  message?: string;
  confirm_password?: string[];
};

// declare interface User extends import('node-appwrite').Models.User<Models.Preferences> {
//   $id?: string;
//   account_id: string;
//   name: string;
//   email: string;
//   avatar: string;
//   password: string;
//   initialsAvatar: string;
//   locale: import('node-appwrite').Models.Locale;
// }
