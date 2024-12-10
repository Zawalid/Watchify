'use client';

import SearchForm from '@/components/SearchForm';
import { usePathname } from 'next/navigation';
import { useSearchParams } from '@/hooks/useSearchParams';
import Tabs from '../../../components/ui/Tabs';

const TABS_INDICATORS = {
  popular: { left: 8, width: 102 },
  'top-rated': { left: 135, width: 118 },
  'now-playing': { left: 273, width: 134 },
  upcoming: { left: 426, width: 118 },
  'airing-today': { left: 273, width: 133 },
  'on-tv': { left: 426, width: 93 },
};

export function ExploreAction() {
  const pathname = usePathname();
  const { searchParams } = useSearchParams();

  const currentPage = pathname.includes('movies') ? 'movies' : pathname.includes('series') ? 'series' : 'search';

  const render = () => {
    switch (currentPage) {
      case 'movies':
        return (
          <Tabs
            tabs={[
              { label: 'Popular', value: 'popular', link: '/movies/popular' },
              { label: 'Top Rated', value: 'top-rated', link: '/movies/top-rated' },
              { label: 'Now Playing', value: 'now-playing', link: '/movies/now-playing' },
              { label: 'Upcoming', value: 'upcoming', link: '/movies/upcoming' },
            ]}
            TABS_INDICATORS={TABS_INDICATORS}
          />
        );
      case 'series':
        return (
          <Tabs
            tabs={[
              { label: 'Popular', value: 'popular', link: '/series/popular' },
              { label: 'Top Rated', value: 'top-rated', link: '/series/top-rated' },
              { label: 'Airing Today', value: 'airing-today', link: '/series/airing-today' },
              { label: 'On TV', value: 'on-tv', link: '/series/on-tv' },
            ]}
            TABS_INDICATORS={TABS_INDICATORS}
          />
        );
      case 'search':
        return (
          <SearchForm
            label='Search For Movies Or Series'
            placeholder='eg. The Wire'
            parentClassName='w-1/2'
            query={searchParams.get('query') || ''}
          />
        );
    }
  };

  return <div className='flex justify-center pt-5'>{render()}</div>;
}
