import { getTopRatedTvShows } from "@/lib/TMDB";
import WithPagination from "../../components/WithPagination";

export const metadata = {
  title: "Top Rated Series | Watchfolio",
  description: "List of top rated series",
};

export default WithPagination(getTopRatedTvShows);