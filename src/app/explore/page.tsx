import CardsList from "@/components/CardsList";
import Tabs from "@/app/explore/_components/Tabs";
import { getPopularTvShows, getTopRatedMovies, getTopRatedTvShows } from "@/lib/TMDB";

export default async function Page() {
  const data = await getTopRatedMovies();
  const movies = true;


  return <CardsList data={data.results} />;
}
