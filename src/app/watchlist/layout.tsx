import Tabs from '@/components/ui/Tabs';



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-full flex-col gap-8'>
      <div className='order-1'>
        <Tabs
          tabs={[
            { label: 'All', value: 'all', link: '/watchlist' },
            { label: 'Movies', value: 'movies', link: '/watchlist/movies' },
            { label: 'TV Shows', value: 'tv-shows', link: '/watchlist/tv-shows' },
          ]}
          TABS_INDICATORS={{
            all: { left: 8, width: 79 },
            movies: { left: 107, width: 102 },
            'tv-shows': { left: 229, width: 112 },
          }}
          preserveSearchParams={true}
        />
      </div>
      {children}
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
