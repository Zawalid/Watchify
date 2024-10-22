import { customFetch } from "./utils";

export const getWatchList = async () => {
  const watchList: WatchList = await customFetch("http://localhost:3001/api/watch_list");
  return watchList;
};

export const getMovies = async () => {
  const movies: Movie[] = (await customFetch("http://localhost:3001/api/watch_list/movies")).movies;
  return movies;
};

export const getTvShows = async () => {
  const shows: TvShow[] = (await customFetch("http://localhost:3001/api/watch_list/tv_shows")).tvShows;
  return shows;
};
