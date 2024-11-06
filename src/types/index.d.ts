type Link = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

declare type Links = {
  authenticated: Link[];
  unauthenticated: Link[];
};


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

declare type disclosure = {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
};
