// Card
declare interface Movie {
  id: number;
  vote_average: number;
  poster_path: string | null;
  genre_ids: number[];
  media_type: 'tv' | 'movie';
  title: string;
  release_date: string | null;
}

declare interface TvShow {
  id: number;
  vote_average: number;
  poster_path: string | null;
  genre_ids: number[];
  media_type: 'tv' | 'movie';
  name: string;
  first_air_date: string | null;
}

// Details
declare interface TMDBMedia {
  id: number;
  vote_average: number;
  backdrop_path: string;
  poster_path: string | null;
  overview: string;
  genres: { id: number; name: string }[];
  genre_ids: number[];
  original_language: string;
  media_type: 'tv' | 'movie';
}

declare interface MovieDetails extends TMDBMedia {
  original_title: string;
  title: string;
  release_date: string | null;
  runtime: number;
}

declare interface TvShowDetails extends TMDBMedia {
  original_name: string;
  name: string;
  status: string;
  first_air_date: string | null;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
}
