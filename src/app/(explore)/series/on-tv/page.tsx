import { getOnTheAirTvShows } from "@/lib/TMDB";
import WithPagination from "../../components/WithPagination";

export const metadata = {
  title: "On The Air Series | Watchfolio",
  description: "List of series currently on the air",
};

export default WithPagination(getOnTheAirTvShows);