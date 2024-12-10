import { getAiringTodayTvShows } from "@/lib/TMDB";
import WithPagination from "../../components/WithPagination";

export const metadata = {
  title: "Airing Today Series | Watchfolio",
  description: "List of series airing today",
};

export default WithPagination(getAiringTodayTvShows);