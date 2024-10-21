function CardSkeleton() {
  return (
    <div className="bg-Grey/900 relative flex animate-pulse flex-col gap-4 rounded-xl p-2 pb-4 backdrop-blur-sm">
      <div className="bg-Black/20 absolute left-4 top-4 z-10 h-8 w-16 rounded-lg backdrop-blur-sm"></div>
      <div className="bg-Grey/800 h-[300px] rounded-xl" />
      <div className="flex flex-col gap-4 px-2">
        <span className="bg-Grey/800 h-4 w-36 rounded-lg"></span>
        <div className="flex gap-2">
          <span className="bg-Grey/800 h-4 w-4 rounded-full"></span>
          <span className="bg-Grey/800 h-4 w-36 rounded-lg"></span>
        </div>
      </div>
    </div>
  );
}

export default function CardsSkeleton({ length = 8 }: { length?: number }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-start gap-5">
      {Array.from({ length }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
