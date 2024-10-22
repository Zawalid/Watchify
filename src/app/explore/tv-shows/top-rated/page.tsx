import CardsList from "@/components/CardsList";
import { getTopRatedTvShows } from "@/lib/TMDB";

export default async function Page() {
  const data = await getTopRatedTvShows();
  return <CardsList data={data.results} />;
}
