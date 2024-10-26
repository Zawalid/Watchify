import { getNowPlayingMovies } from "@/lib/TMDB";
import withCustomPage from "../../_components/WithPagination";

export const metadata = {
  title: "Now Playing Movies",
  description: "List of now playing movies",
};

export default withCustomPage(getNowPlayingMovies);