import { placeholder } from '@/utils/shimmer-placeholder';
import { LANGUAGES } from '@/lib/api/TMDB/config';
import { getMediaType, getRating, getReleaseYear } from '@/utils';
import Image from 'next/image';

export function Details({ media }: { media: TvShow | Movie }) {
  const { vote_average, backdrop_path, poster_path, overview, original_language } = media;
  const type = getMediaType(media);

  const title = type === 'movie' ? (media as Movie).title : (media as TvShow).name;
  const original_title = type === 'movie' ? (media as Movie).original_title : (media as TvShow).original_name;

  return (
    <div className='flex h-full flex-col gap-12'>
      <div
        className='relative h-[480px] rounded-2xl bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(54, 44, 146, 0.40) 0%, rgba(18, 98, 151, 0.40) 100%), url("http://image.tmdb.org/t/p/original${backdrop_path}")`,
        }}
      >
        <div className='absolute -bottom-14 left-0 flex w-full flex-col gap-2 rounded-2xl border border-Grey/700 bg-[rgba(32,40,62,0.80)] px-10 py-5 backdrop-blur-md mobile:left-14 mobile:w-fit'>
          <div className='flex gap-2 text-sm text-Primary/200'>
            <span>{getReleaseYear(media)}</span>|
            <span>{LANGUAGES.find((l) => l.iso_639_1 === original_language)?.english_name}</span>
            {original_title !== title && (
              <>
                |<span>{original_title}</span>
              </>
            )}
          </div>
          <h3 className='text-2xl font-bold text-Grey/50'>{title}</h3>
        </div>
      </div>
      <div className='flex flex-col-reverse items-center gap-10 py-14 md:flex-row md:items-start'>
        <div className='relative h-full max-h-[650px] min-h-[500px] w-[350px]'>
          <Image
            src={`http://image.tmdb.org/t/p/original${poster_path}`}
            alt={title}
            className='rounded-xl object-cover'
            fill
            placeholder={placeholder}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <p className='max-w-[500px] text-Grey/300'>{overview}</p>
          <div className='flex w-fit items-center gap-1 rounded-lg bg-Black/65 px-2 py-1 text-Warning/500 backdrop-blur-sm'>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
              <path
                d='M9.15336 2.34001L10.3267 4.68668C10.4867 5.01334 10.9134 5.32668 11.2734 5.38668L13.4 5.74001C14.76 5.96668 15.08 6.95334 14.1 7.92668L12.4467 9.58001C12.1667 9.86001 12.0134 10.4 12.1 10.7867L12.5734 12.8333C12.9467 14.4533 12.0867 15.08 10.6534 14.2333L8.66003 13.0533C8.30003 12.84 7.7067 12.84 7.34003 13.0533L5.3467 14.2333C3.92003 15.08 3.05336 14.4467 3.4267 12.8333L3.90003 10.7867C3.9867 10.4 3.83336 9.86001 3.55336 9.58001L1.90003 7.92668C0.926698 6.95334 1.24003 5.96668 2.60003 5.74001L4.7267 5.38668C5.08003 5.32668 5.5067 5.01334 5.6667 4.68668L6.84003 2.34001C7.48003 1.06668 8.52003 1.06668 9.15336 2.34001Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='text-sm'>{getRating(vote_average)}</span>
          </div>
          {type === 'movie' ? <MovieDetails details={media as Movie} /> : <TvShowDetails details={media as TvShow} />}
        </div>
      </div>
    </div>
  );
}

function MovieDetails({ details }: { details: Movie }) {
  const { release_date, runtime, genres } = details;

  return (
    <>
      <Genres genres={genres} />
      <div className='flex flex-col gap-2'>
        <span className='text-sm text-Grey/400'>Release Date</span>
        <span className='text-Grey/100'>{release_date}</span>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-sm text-Grey/400'>Run time</span>
        <span className='text-Grey/100'>{Number(runtime) ? runtime : 0} min</span>
      </div>
    </>
  );
}

function TvShowDetails({ details }: { details: TvShow }) {
  const { status, first_air_date, last_air_date, number_of_seasons, number_of_episodes, genres, episode_run_time } =
    details;

  return (
    <>
      <div className='grid grid-cols-2 gap-5'>
        <Genres genres={genres} />
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-Grey/400'>Status</span>
          <span className='text-Grey/100'>{status}</span>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-5'>
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-Grey/400'>First air date</span>
          <span className='text-Grey/100'>{first_air_date}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-Grey/400'>Last air date</span>
          <span className='text-Grey/100'>{last_air_date}</span>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-5'>
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-Grey/400'>Np. of seasons</span>
          <span className='text-Grey/100'>{number_of_seasons}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-Grey/400'>Np. of episodes</span>
          <span className='text-Grey/100'>{number_of_episodes}</span>
        </div>
      </div>
      {!!Number(episode_run_time) && (
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-Grey/400'>Episode run time</span>
          <span className='text-Grey/100'>{Number(episode_run_time)} min</span>
        </div>
      )}
    </>
  );
}

function Genres({ genres }: { genres: { id: number; name: string }[] }) {
  return (
    <div className='flex flex-col gap-2'>
      <span className='text-sm text-Grey/400'>Genres</span>
      <div className='flex flex-wrap items-center gap-2'>
        {genres.map((g) => (
          <span key={g.id} className='text-nowrap rounded-md bg-Grey/700 p-1.5 text-sm text-Grey/100'>
            {g.name}
          </span>
        ))}
      </div>
    </div>
  );
}
