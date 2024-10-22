"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { NoResults } from "./Status";
import { useSearchQuery } from "@/hooks/useSearchParams";
import Card from "./Card";
import { getMediaType } from "@/lib/utils";

export default function CardsList({
  data = [],
  emptyComponent,
}: {
  data: TvShow[] | Movie[];
  emptyComponent?: JSX.Element;
}) {
  const { query } = useSearchQuery();
  const [parent] = useAutoAnimate({ duration: 400 });

  const filteredData = data.filter((media) => {
    const title = getMediaType(media) === "movie" ? (media as Movie).title : (media as TvShow).name;
    return title.toLowerCase().includes(query.toLowerCase());
  });

  if (query && !filteredData.length) return <NoResults />;
  if (!data?.length && emptyComponent) return emptyComponent;

  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-start gap-5"
      ref={parent}
    >
      {filteredData.map((media) => (
        <Card key={media.id} media={media} />
      ))}
    </div>
  );
}
