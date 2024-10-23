import CardsList from "@/components/CardsList";
import { getOnTheAirTvShows } from "@/lib/TMDB";

export default async function Page() {
  const data = await getOnTheAirTvShows();
  return <CardsList data={data} />;
}
