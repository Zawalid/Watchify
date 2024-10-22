import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export function NoResults({ children }: { children?: ReactNode }) {
  return (
    <div className="flex min-h-[500px] flex-1 flex-col items-center justify-center gap-1 text-center">
      <div className="relative aspect-square w-[300px]">
        <Image src="/images/empty.svg" alt="" fill />
      </div>{" "}
      <h2 className="text-Grey/50 text-xl font-semibold sm:text-2xl">Sorry, No results found</h2>
      <p className="text-Grey/300 font-medium">
        There are no movies or TV shows matching your search terms.
      </p>
      {children}
    </div>
  );
}

export function EmptyWatchList({ type = "all" }: { type?: string }) {
  const heading =
    type === "all" ? "There are no items in your list" : `There are no ${type} in your list`;

  return (
    <div className="flex min-h-[500px] flex-1 flex-col items-center justify-center gap-1 text-center">
      <div className="relative aspect-square w-[300px]">
        <Image src="/images/empty.svg" alt="" fill />
      </div>
      <h2 className="text-Grey/50 text-xl font-semibold sm:text-2xl">{heading}</h2>
      <p className="text-Grey/300 font-medium">
        Your watchlist is empty! Maybe your friends have some great suggestions?
        <br />
        Check your friends
        <Link
          href="/suggestions"
          className="w-fit font-medium text-Primary/400 mx-1 hover:text-Primary/500 duration-200 transition-colors"
        >
          recommendations
        </Link>
        or
        <Link
          href="/add"
          className="w-fit font-medium text-Primary/400 mx-1 hover:text-Primary/500 duration-200 transition-colors"
        >
          add
        </Link>
        some {type === "all" ? "movies or TV shows" : type} to fill your list.
      </p>
    </div>
  );
}
