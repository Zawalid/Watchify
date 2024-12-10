import { getPopularTvShows } from "@/lib/TMDB";
import WithPagination from "../../components/WithPagination";

export const metadata = {
  title: "Popular Series | Watchfolio",
  description: "List of popular series",
};

export default WithPagination(getPopularTvShows);