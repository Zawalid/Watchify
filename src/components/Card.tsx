import { GENRES } from "@/lib/TMDB/config";
import { getMediaType, getRating, getReleaseYear, slugify } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import placeholderImage from "@/images/placeholder.png";
import { placeholder } from "@/utils/shimmer-placeholder";
import CardActions from "./CardActions";

const getLink = (type: string, name: string) => {
  return `/${type === "tv" ? "tv-shows" : "movies"}/${slugify(name)}`;
};

export default function Card({ media }: { media: TvShow | Movie }) {
  const { poster_path, vote_average, genre_ids } = media;
  const type = getMediaType(media);
  const title = type === "movie" ? (media as Movie).title : (media as TvShow).name;

  return (
    <div className="flex flex-col group relative">
      <CardActions />
      <Link href={getLink(type, title)} className="w-full mb-3 rounded-2xl">
        <div className="w-full h-[220px] md:h-[250px]  lg:h-[300px] relative overflow-hidden shadow-lg rounded-2xl ">
          {media.poster_path ? (
            <Image
              src={`http://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              fill
              sizes="100%"
              className="object-center object-cover transition-transform duration-300 group-hover:scale-110"
              placeholder={placeholder}
            />
          ) : (
            <Image
              src={placeholderImage}
              placeholder={placeholder}
              alt={title}
              fill
              className="object-cover"
            />
          )}
        </div>
      </Link>
      <div className="flex justify-between items-center gap-1 mb-2">
        <Link
          href={getLink(type, title)}
          className="text-sm md:text-base text-Primary/50 hover:text-Primary/200 text-ellipsis mb-1 sm:mb-2 line-clamp-1 cursor-pointer"
        >
          {title}
        </Link>
        <p className="text-xs md:text-sm text-Grey/300">{getReleaseYear(media) || "N/A"}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs md:text-sm text-Grey/300 text-ellipsis line-clamp-1">
          {genre_ids?.length
            ? genre_ids?.map((id) => GENRES.find((g) => g.id === id)?.name).join(", ")
            : "N/A"}
        </p>
        <div className="flex justify-between items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 md:w-4 text-yellow-500 dark:text-yellow-600 -mt-[3px]"
          >
            <path
              d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
              fill="currentColor"
              strokeWidth="0"
            ></path>
          </svg>
          <p className="text-xs md:text-sm text-slate-600 dark:text-zinc-400">
            {getRating(vote_average || 0)}
          </p>
        </div>
      </div>
    </div>
  );
}
