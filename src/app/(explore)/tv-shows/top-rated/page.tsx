import { getTopRatedTvShows } from "@/lib/TMDB";
import WithPagination from "../../components/WithPagination";

export const metadata = {
  title: "Top Rated TV Shows | Watchfolio",
  description: "List of top rated TV shows",
};

export default WithPagination(getTopRatedTvShows);