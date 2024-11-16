import { getUpcomingMovies } from "@/lib/TMDB";
import WithPagination from "../../components/WithPagination";

export const metadata = {
  title: "Upcoming Movies | Watchfolio",
  description: "List of upcoming movies",
};

export default WithPagination(getUpcomingMovies);