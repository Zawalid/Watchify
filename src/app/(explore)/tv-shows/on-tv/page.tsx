import { getOnTheAirTvShows } from "@/lib/TMDB";
import WithPagination from "../../components/WithPagination";

export const metadata = {
  title: "On The Air TV Shows | Watchfolio",
  description: "List of TV shows currently on the air",
};

export default WithPagination(getOnTheAirTvShows);