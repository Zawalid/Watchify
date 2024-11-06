import SearchForm from '@/components/SearchForm';
import Tabs from '@/components/Tabs';
import { getWatchlist } from '@/lib/appwrite';

export const metadata = {
  title: 'Watch List',
  description: 'List of movies and TV Shows, I, Walid Zakan have watched till date.',
};

export default async function Page() {
  const watchlist = await getWatchlist();

  // console.dir(watchlist, { depth: 5 });

  return (
    <div className='flex h-full flex-col gap-12'>
      <div className='flex w-1/2 flex-col gap-4'>
        <h1 className='text-4xl font-semibold text-Grey/50'>Your Watch List</h1>
        <SearchForm label='Search Your Movies And TV Shows' placeholder='eg. Breaking Bad' />
      </div>
      <div className='flex flex-col gap-6'>{/* <Tabs data={data} /> */}</div>
    </div>
  );
}

/* 

 <p className="text-Grey/300 leading-relaxed">
   List of movies and TV Shows, I, <span className="text-Primary/300">Walid Zakan</span> have
   watched till date.
   <br />
   Explore what I have watched and also feel free to make a suggestion. 😉
 </p>

 <Link href="/" className="w-fit font-medium text-Primary/200">
            Walid Zakan
          </Link>
*/
