import { useDetails } from '@/services/hooks';
import { Link, useParams } from 'react-router-dom';

export function Details() {
  const id = useParams().id;
  const type = location.pathname.includes('/movie') ? 'movie' : 'tv';
  const { data, error } = useDetails(type, id);

  if (error) {
    return (
      <div className='flex h-full flex-1 flex-col items-center justify-center gap-1 text-center'>
        <img src='/404.svg' alt='' />
        <h2 className='text-xl font-semibold text-Grey/50 sm:text-3xl'>
          Sorry, {type === 'movie' ? 'Movie' : 'TV Show'} not found
        </h2>
        <p className='font-medium text-Grey/300'>
          The {type === 'movie' ? 'movie' : 'TV show'} you are looking for could not be found.
          <br />
          Please check the ID and try again.
        </p>
      </div>
    );
  }
  if (!data) return;

  const title = data.original_name || data.name;
  const rating = data.vote_average;

  return (
    <div className='flex h-full flex-col gap-12'>
      <div
        className='relative h-[480px] rounded-2xl bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(54, 44, 146, 0.40) 0%, rgba(18, 98, 151, 0.40) 100%), url("http://image.tmdb.org/t/p/original${data.backdrop_path}")`,
        }}
      >
        <div className='absolute -bottom-14 mobile:w-fit mobile:left-14 w-full left-0 flex flex-col gap-2 rounded-2xl border border-Grey/700 bg-[rgba(32,40,62,0.80)] px-10 py-5 backdrop-blur-md'>
          <span className='flex gap-1 text-sm text-Primary/200'>
            <Link to='/' className='transition-colors duration-300 hover:text-Primary/300'>
              MaileHereko
            </Link>
            <span>/</span>
            <Link
              to={type === 'movie' ? '/movies' : '/tv-shows'}
              className='transition-colors duration-300 hover:text-Primary/300'
            >
              {type === 'movie' ? 'Movies' : 'TV Shows'}
            </Link>
          </span>
          <h3 className='text-xl font-bold text-Grey/50'>{title}</h3>
        </div>
      </div>
      <div className='flex items-center md:items-start flex-col-reverse md:flex-row gap-10 py-14'>
        <img
          src={`http://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={title}
          className='max-h-[650px] w-[400px] rounded-xl object-cover'
        />
        <div className='flex flex-col gap-4'>
          <h3 className='text-lg font-semibold text-Grey/50'>{data.tagline || title}</h3>
          <p className='max-w-[500px] text-Grey/300'>{data.overview}</p>
          <div className='flex w-fit items-center gap-1 rounded-lg bg-Black/65 px-2 py-1 text-Warning/500 backdrop-blur-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
            >
              <path
                d='M9.15336 2.34001L10.3267 4.68668C10.4867 5.01334 10.9134 5.32668 11.2734 5.38668L13.4 5.74001C14.76 5.96668 15.08 6.95334 14.1 7.92668L12.4467 9.58001C12.1667 9.86001 12.0134 10.4 12.1 10.7867L12.5734 12.8333C12.9467 14.4533 12.0867 15.08 10.6534 14.2333L8.66003 13.0533C8.30003 12.84 7.7067 12.84 7.34003 13.0533L5.3467 14.2333C3.92003 15.08 3.05336 14.4467 3.4267 12.8333L3.90003 10.7867C3.9867 10.4 3.83336 9.86001 3.55336 9.58001L1.90003 7.92668C0.926698 6.95334 1.24003 5.96668 2.60003 5.74001L4.7267 5.38668C5.08003 5.32668 5.5067 5.01334 5.6667 4.68668L6.84003 2.34001C7.48003 1.06668 8.52003 1.06668 9.15336 2.34001Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='text-sm'>{rating % 1 === 0 ? rating : rating.toFixed(2)}</span>
          </div>
          {type === 'movie' ? <MovieDetails details={data} /> : <TvShowDetails details={data} />}
        </div>
      </div>
    </div>
  );
}

function MovieDetails() {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <span className='text-sm text-Grey/400'>Type</span>
        <span className='text-Grey/100'>Movie</span>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-sm text-Grey/400'>Release Date</span>
        <span className='text-Grey/100'>2019-04-24</span>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-sm text-Grey/400'>Run time</span>
        <span className='text-Grey/100'>181 min</span>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-sm text-Grey/400'>Genres</span>
        <span className='text-Grey/100'>Adventure, Science Fiction, Action</span>
      </div>
    </>
  );
}

function TvShowDetails({ details }) {
  return (
    <>
      <div className='grid grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-Grey/400'>Type</span>
          <span className='text-Grey/100'>TV Show</span>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-Grey/400'>Status</span>
          <span className='text-Grey/100'>{details.status}</span>
        </div>
      </div>
      <div className='grid grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-Grey/400'>First air date</span>
          <span className='text-Grey/100'>{details.first_air_date}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-Grey/400'>Last air date</span>
          <span className='text-Grey/100'>{details.last_air_date}</span>
        </div>
      </div>
      <div className='grid grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-Grey/400'>Np. of seasons</span>
          <span className='text-Grey/100'>{details.number_of_seasons}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-Grey/400'>Np. of episodes</span>
          <span className='text-Grey/100'>{details.number_of_episodes}</span>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-sm text-Grey/400'>Episode run time</span>
        <span className='text-Grey/100'>
          {Number(details.episode_run_time) ? details.episode_run_time : 0} min
        </span>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-sm text-Grey/400'>Genres</span>
        <span className='text-Grey/100'>{details.genres.map((g) => g.name).join(', ')}</span>
      </div>
    </>
  );
}
