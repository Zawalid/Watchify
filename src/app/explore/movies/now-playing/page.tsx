import CardsList from "@/components/CardsList";
import { getNowPlayingMovies } from "@/lib/TMDB";

export default async function Page() {
  const data = await getNowPlayingMovies();
  return <CardsList data={data} />;
}
