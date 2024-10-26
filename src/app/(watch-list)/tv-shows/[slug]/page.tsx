import { getDetails } from "@/lib/TMDB";
import { notFound } from "next/navigation";
import { Details } from "../../Details";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const tvShow = await getDetails("tv", slug);

  return {
    title: (tvShow as TvShow).name,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const tvShow = await getDetails("tv", slug);

  if (!tvShow) notFound();

  return <Details media={tvShow} />;
}
