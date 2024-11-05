type Link = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

declare type Links = {
  authenticated: Link[];
  unauthenticated: Link[];
};

declare type IconType = 'name' | 'email' | 'search' | 'password' | 'visible' | 'invisible' | 'title' | 'link';

declare type TMDBResponse = {
  page: number;
  results: TvShow[] | Movie[];
  total_pages: number;
  total_results: number;
};

declare type FormError = {
  email?: string[];
  password?: string[];
  name?: string[];
  message?: string;
  confirm_password?: string[];
};
