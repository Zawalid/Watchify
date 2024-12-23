import { getNowPlayingMovies } from "@/lib/TMDB";
import withCustomPage from "../../components/WithPagination";

export const metadata = {
  title: "Now Playing Movies | Watchfolio",
  description: "List of now playing movies",
};

export default withCustomPage(getNowPlayingMovies);