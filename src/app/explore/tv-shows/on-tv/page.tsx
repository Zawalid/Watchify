import { getOnTheAirTvShows } from "@/lib/TMDB";
import WithPagination from "../../_components/WithPagination";

export const metadata = {
  title: "On The Air TV Shows",
  description: "List of TV shows currently on the air",
};

export default WithPagination(getOnTheAirTvShows);