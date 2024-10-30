import { getTopRatedTvShows } from "@/lib/api/TMDB";
import WithPagination from "../../_components/WithPagination";

export const metadata = {
  title: "Top Rated TV Shows",
  description: "List of top rated TV shows",
};

export default WithPagination(getTopRatedTvShows);