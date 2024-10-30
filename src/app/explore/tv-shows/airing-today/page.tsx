import { getAiringTodayTvShows } from "@/lib/api/TMDB";
import WithPagination from "../../_components/WithPagination";

export const metadata = {
  title: "Airing Today TV Shows",
  description: "List of TV shows airing today",
};

export default WithPagination(getAiringTodayTvShows);