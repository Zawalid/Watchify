declare interface Media {
  id: number;
  original_name?: string;
  name: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  genres: { id: number; name: string }[];
  genre_ids: number[];
  original_language: string;
}

declare interface Movie extends Media {
  release_date: string;
  runtime: number;
}

declare interface TvShow extends Media {
  status: string;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
}
