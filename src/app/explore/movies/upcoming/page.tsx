import { getUpcomingMovies } from "@/lib/TMDB";
import WithPagination from "../../_components/WithPagination";

export const metadata = {
  title: "Upcoming Movies",
  description: "List of upcoming movies",
};

export default WithPagination(getUpcomingMovies);