"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { NoResults } from "./Status";
import { useSearchQuery } from "@/hooks/useSearchParams";
import Card from "./Card";

export default function CardsList({
  items = [],
  emptyComponent,
}: {
  items: TvShow[] | Movie[];
  emptyComponent: JSX.Element;
}) {
  const { query } = useSearchQuery();
  const [parent] = useAutoAnimate({ duration: 400 });

  const filteredItems = items.filter((media) =>
    media.name.toLowerCase().includes(query.toLowerCase())
  );

  if (query && !filteredItems.length) return <NoResults />;
  if (!items?.length) return emptyComponent;

  return (
    <div
      className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-start gap-5"
      ref={parent}
    >
      {filteredItems.map((media) => (
        <Card key={media.id} media={media} />
      ))}
    </div>
  );
}
