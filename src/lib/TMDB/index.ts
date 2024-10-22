import { getQueryString } from "../utils";

const options = {
  url: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
  },
};

export const search = async (query: string, page: number): Promise<TMDBResponse> => {
  const queryString = getQueryString({ query, page: String(page) });

  const res = await fetch(`${options.url}/search/multi${queryString}`, {
    headers: options.headers,
  });
  const data = await res.json();
  return data;
};

export const getDetails = async (type: "movie" | "tv", slug: string) => {
  if (!type || !slug) throw new Error("Type and Slug are required");
  const res = await search(slug, 1);
  const id = res.results?.[0]?.id;

  if (!id) return null;

  const details = await fetch(`${options.url}/${type}/${id}`, {
    headers: options.headers,
  });
  const data: TvShow | Movie = await details.json();
  return data;
};

// TV Shows
export const searchTvShows = async (query: string, page: number): Promise<TMDBResponse> => {
  const queryString = getQueryString({ query, page: String(page) });

  const res = await fetch(`${options.url}/search/tv${queryString}`, {
    headers: options.headers,
  });
  const data = await res.json();
  return data;
};

export const getPopularTvShows = async (): Promise<TMDBResponse> => {
  const res = await fetch(`${options.url}/tv/popular`, {
    headers: options.headers,
  });
  const data = await res.json();
  return data;
};

export const getTopRatedTvShows = async (): Promise<TMDBResponse> => {
  const res = await fetch(`${options.url}/tv/top_rated`, {
    headers: options.headers,
  });
  const data = await res.json();
  return data;
};

export const getAiringTodayTvShows = async (): Promise<TMDBResponse> => {
  const res = await fetch(`${options.url}/tv/airing_today`, {
    headers: options.headers,
  });
  const data = await res.json();
  return data;
};

export const getOnTheAirTvShows = async (): Promise<TMDBResponse> => {
  const res = await fetch(`${options.url}/tv/on_the_air`, {
    headers: options.headers,
  });
  const data = await res.json();
  return data;
};

// Movies
export const searchMovie = async (query: string, page: number): Promise<TMDBResponse> => {
  const queryString = getQueryString({ query, page: String(page) });

  const res = await fetch(`${options.url}/search/movie${queryString}`, {
    headers: options.headers,
  });
  const data = await res.json();
  return data;
};

export const getPopularMovies = async (): Promise<TMDBResponse> => {
  const res = await fetch(`${options.url}/movie/popular`, {
    headers: options.headers,
  });
  const data = await res.json();
  return data;
};

export const getTopRatedMovies = async (): Promise<TMDBResponse> => {
  const res = await fetch(`${options.url}/movie/top_rated`, {
    headers: options.headers,
  });
  const data = await res.json();
  return data;
};

export const getNowPlayingMovies = async (): Promise<TMDBResponse> => {
  const res = await fetch(`${options.url}/movie/now_playing`, {
    headers: options.headers,
  });
  const data = await res.json();
  return data;
};

export const getUpcomingMovies = async (): Promise<TMDBResponse> => {
  const res = await fetch(`${options.url}/movie/upcoming`, {
    headers: options.headers,
  });
  const data = await res.json();
  return data;
};
