import { useWatchList } from '@/services/hooks';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { data } = useWatchList();
  return (
    <div className='flex flex-col gap-12'>
      <h2 className='text-3xl font-semibold text-Grey/50'>Welcome</h2>
      <div className='grid gap-5 sm:grid-cols-2 md:grid-cols-4'>
        {[
          { name: 'Movies', count: data?.movies },
          { name: 'Tv Shows', count: data?.tv},
          { name: 'Suggestions', count: 7 },
          { name: 'Manual Suggestions', count: 3 },
        ].map(({ name, count }) => (
          <Stat key={name} name={name} count={count} />
        ))}
      </div>
      <div className='flex flex-col gap-8'>
        <h5 className='text-center text-xl font-semibold text-Grey/50'>Quick Links</h5>
        <div className='grid grid-cols-2 gap-5'>
          {['suggestions', 'add'].map((l) => (
            <div
              key={l}
              className='flex flex-col items-center justify-center gap-2 rounded-xl border border-Grey/700 bg-Grey/900 p-10'
            >
              <Link
                to={`/${l}`}
                className='font-semibold capitalize text-Primary/400 transition-colors duration-300 hover:text-Primary/500'
              >
                {l}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ count, name }) {
  return (
    <div className='flex flex-col items-center justify-center gap-2 rounded-xl border border-Grey/700 bg-Grey/900 px-10 py-4 transition-transform duration-300 hover:scale-105'>
      <h3 className='text-2xl font-medium text-Grey/300'>{count}</h3>
      <p className='text-Grey/400'>{name}</p>
    </div>
  );
}
