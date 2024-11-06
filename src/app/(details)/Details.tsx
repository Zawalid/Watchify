import { placeholder } from '@/utils/shimmer-placeholder';
import { LANGUAGES } from '@/lib/TMDB/config';
import { getMediaType, getRating, getReleaseYear } from '@/utils';
import Image from 'next/image';
import { STAR_ICON } from '@/components/ui/Icons';

export function Details({ media }: { media: TvShowDetails | MovieDetails }) {
  const { vote_average, backdrop_path, poster_path, overview, original_language } = media;
  const type = getMediaType(media);

  const title = type === 'movie' ? (media as MovieDetails).title : (media as TvShowDetails).name;
  const original_title =
    type === 'movie' ? (media as MovieDetails).original_title : (media as TvShowDetails).original_name;

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
            {STAR_ICON}
            <span className='text-sm'>{getRating(vote_average)}</span>
          </div>
          {type === 'movie' ? (
            <MovieDetails details={media as MovieDetails} />
          ) : (
            <TvShowDetails details={media as TvShowDetails} />
          )}
        </div>
      </div>
    </div>
  );
}

function MovieDetails({ details }: { details: MovieDetails }) {
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

function TvShowDetails({ details }: { details: TvShowDetails }) {
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
