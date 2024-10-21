import Image from "next/image";
import Link from "next/link";

export default function Card({ item, action }: { item: Item; action?: JSX.Element }) {
  const name = (item.original_name || item.name) as string;
  const link = `/${item.media_type}/${item.id}`;
  const rating = item.vote_average || 0;

  return (
    <div className="border-Grey/700 group relative flex flex-col gap-4 rounded-xl border bg-[rgba(32,40,62,0.80)] p-2 pb-4 backdrop-blur-2xl">
      <div className="bg-Black/65 text-Warning/500 absolute left-4 top-4 z-10 flex items-center gap-1 rounded-lg px-2 py-1 backdrop-blur-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M9.15336 2.34001L10.3267 4.68668C10.4867 5.01334 10.9134 5.32668 11.2734 5.38668L13.4 5.74001C14.76 5.96668 15.08 6.95334 14.1 7.92668L12.4467 9.58001C12.1667 9.86001 12.0134 10.4 12.1 10.7867L12.5734 12.8333C12.9467 14.4533 12.0867 15.08 10.6534 14.2333L8.66003 13.0533C8.30003 12.84 7.7067 12.84 7.34003 13.0533L5.3467 14.2333C3.92003 15.08 3.05336 14.4467 3.4267 12.8333L3.90003 10.7867C3.9867 10.4 3.83336 9.86001 3.55336 9.58001L1.90003 7.92668C0.926698 6.95334 1.24003 5.96668 2.60003 5.74001L4.7267 5.38668C5.08003 5.32668 5.5067 5.01334 5.6667 4.68668L6.84003 2.34001C7.48003 1.06668 8.52003 1.06668 9.15336 2.34001Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm">{rating % 1 === 0 ? rating : rating.toFixed(2)}</span>
      </div>
      <Link href={link}>
        <div className="h-[300px] relative overflow-hidden rounded-xl ">
          {item.poster_path ? (
            <Image
              src={`http://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <Image src="/images/placeholder.png" alt="" fill className="object-cover" />
          )}
        </div>
      </Link>
      <div className="flex flex-col gap-3 px-2">
        <Link href={link}>
          <h5 className="text-Grey/50 font-semibold">{name}</h5>
        </Link>
        {action}
      </div>
    </div>
  );
}
