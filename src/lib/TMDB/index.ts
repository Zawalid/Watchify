import { getQueryString } from "../../utils";

const options = {
  url: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
  },
};

const fetchFromApi = async (
  endpoint: string,
  queryParams: Record<string, string> = {}
): Promise<TMDBResponse> => {
  const queryString = getQueryString(queryParams);
  const res = await fetch(`${options.url}${endpoint}${queryString}`, {
    headers: options.headers,
  });
  return await res.json();
};

export const search = async (query: string, page?: number): Promise<TMDBResponse> => {
  return await fetchFromApi(`/search/multi`, { query, page: String(page || 1) });
};

export const getDetails = async (
  type: "movie" | "tv",
  slug: string
): Promise<TvShowDetails | MovieDetails | null> => {
  if (!type || !slug) throw new Error("Type and Slug are required");
  const res = await search(slug, 1);
  const id = res.results?.[0]?.id;

  if (!id) return null;

  const details = await fetch(`${options.url}/${type}/${id}`, { headers: options.headers });
  return await details.json();
};

// TV Shows
export const searchTvShows = async (query: string, page?: number): Promise<TMDBResponse> => {
  return await fetchFromApi(`/search/tv`, { query, page: String(page || 1) });
};

export const getPopularTvShows = async (page?: number): Promise<TMDBResponse> => {
  return await fetchFromApi(`/tv/popular`, { page: String(page || 1) });
};

export const getTopRatedTvShows = async (page?: number): Promise<TMDBResponse> => {
  return await fetchFromApi(`/tv/top_rated`, { page: String(page || 1) });
};

export const getAiringTodayTvShows = async (page?: number): Promise<TMDBResponse> => {
  return await fetchFromApi(`/tv/airing_today`, { page: String(page || 1) });
};

export const getOnTheAirTvShows = async (page?: number): Promise<TMDBResponse> => {
  return await fetchFromApi(`/tv/on_the_air`, { page: String(page || 1) });
};

// Movies
export const searchMovie = async (query: string, page?: number): Promise<TMDBResponse> => {
  return await fetchFromApi(`/search/movie`, { query, page: String(page || 1) });
};

export const getPopularMovies = async (page?: number): Promise<TMDBResponse> => {
  return await fetchFromApi(`/movie/popular`, { page: String(page || 1) });
};

export const getTopRatedMovies = async (page?: number): Promise<TMDBResponse> => {
  return await fetchFromApi(`/movie/top_rated`, { page: String(page || 1) });
};

export const getNowPlayingMovies = async (page?: number): Promise<TMDBResponse> => {
  return await fetchFromApi(`/movie/now_playing`, { page: String(page || 1) });
};

export const getUpcomingMovies = async (page?: number): Promise<TMDBResponse> => {
  return await fetchFromApi(`/movie/upcoming`, { page: String(page || 1) });
};
