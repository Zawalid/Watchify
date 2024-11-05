import { getDetails } from "@/lib/TMDB";
import { notFound } from "next/navigation";
import { Details } from "../../Details";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;
  const tvShow = await getDetails("tv", slug);

  return {
    title: (tvShow as TvShow).name,
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;
  const tvShow = await getDetails("tv", slug);

  if (!tvShow) notFound();

  return <Details media={tvShow} />;
}
