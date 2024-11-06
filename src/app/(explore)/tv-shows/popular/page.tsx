import { getPopularTvShows } from "@/lib/TMDB";
import WithPagination from "../../components/WithPagination";

export const metadata = {
  title: "Popular TV Shows",
  description: "List of popular TV shows",
};

export default WithPagination(getPopularTvShows);