import Card from '@/components/Card';
import SearchForm from '@/components/SearchForm';
import { getWatchlist } from '@/lib/appwrite';

function List({ items, query }: { items: WatchlistItem[]; query: string }) {
  const list = items
    .map((item) => item.media)
    .filter((media) => media.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] items-start gap-5 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'>
      {list.map((media) => {
        const { poster_path, vote_average, genre_ids, title, tmdb_id: id, media_type, release_date } = media;
        const updatedMedia: Movie | TvShow = {
          id,
          title: media.title,
          name: media.title,
          poster_path,
          vote_average,
          genre_ids,
          media_type,
          release_date,
          first_air_date: release_date,
        };
        return <Card key={media.tmdb_id} media={updatedMedia} />;
      })}
    </div>
  );
}

const WatchlistItems = (type: 'all' | 'movie' | 'tv') => {
  return async function Page({ searchParams }: { searchParams?: Promise<{ query?: string }> }) {
    const query = (await searchParams)?.query || '';
    const watchlist = await getWatchlist();

    const items = type === 'all' ? watchlist?.items : watchlist?.items.filter((item) => item.media.media_type === type);

    return (
      <>
        <div className='order-0 flex w-1/2 flex-col gap-4'>
          <h1 className='text-4xl font-semibold text-Grey/50'>Your Watch List</h1>
          <SearchForm label='Search Your Movies And TV Shows' placeholder='eg. Breaking Bad' query={query}/>
        </div>
        <div className='order-2 space-y-5'>
          <h2 className='text-2xl font-semibold text-Grey/400'>
            TV Shows
            <span className='ml-1 text-base'>(13)</span>
          </h2>
          <List items={items || []} query={query} />;
        </div>
      </>
    );
  };
};

export default WatchlistItems;
