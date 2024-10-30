import { getPopularTvShows } from "./TMDB";
// import { customFetch } from "./utils";

export const getWatchList = async () => {
  const watchList: TMDBResponse = await getPopularTvShows();
  return watchList;
};

export const getMovies = async () => {
  const movies: TMDBResponse = await getPopularTvShows();
  return movies;
};

export const getTvShows = async () => {
  const shows: TMDBResponse = await getPopularTvShows();
  return shows;
};
