declare interface TMDBMedia {
  id: number;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  genres: { id: number; name: string }[];
  genre_ids: number[];
  original_language: string;
  media_type: 'tv' | 'movie';
}

declare interface Movie extends TMDBMedia {
  original_title: string;
  title: string;
  release_date: string;
  runtime: number;
}

declare interface TvShow extends TMDBMedia {
  original_name: string;
  name: string;
  status: string;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
}
