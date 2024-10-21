import { customFetch } from "./utils";

export const getWatchList = async () => {
  const watchList: WatchList = await customFetch("http://localhost:3001/api/watch_list");
  return watchList;
};

export const getMovies = async () => {
  const movies: Item[] = (await customFetch("http://localhost:3001/api/watch_list/movies")).movies;
  return movies;
};

export const getTvShows = async () => {
  const shows: Item[] = (await customFetch("http://localhost:3001/api/watch_list/tv_shows")).shows;
  return shows;
};
