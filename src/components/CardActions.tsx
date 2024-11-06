'use client';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from '@nextui-org/dropdown';
import { useDisclosure } from '@nextui-org/modal';
import AddToList from './AddToList';
import { addWatchlistItem } from '@/lib/appwrite/actions';
import { useState } from 'react';
import { toast } from 'sonner';
import { ADD_TO_LIST_ICON, FAVORITE_ICON, WATCHLIST_ADDED_ICON, WATCHLIST_ICON } from './ui/Icons';

export default function CardActions({ media, isAdded }: { media: Movie | TvShow; isAdded: boolean }) {
  const [exists, setExists] = useState(isAdded);
  const disclosure = useDisclosure();

  const onToggleToWatchlist = async () => {
    if (exists) return;
    const id = toast.loading('Adding to watchlist...');
    await addWatchlistItem(media);
    setExists(true);
    toast.success(`"${(media as Movie).title || (media as TvShow).name}" was added to your watchlist`, {
      id,
    });
  };

  return (
    <>
      <Dropdown classNames={{ content: 'blur-bg  backdrop-blur-2xl' }} backdrop='opaque' radius='sm'>
        <DropdownTrigger>
          <button className='absolute right-2 top-2 z-10 grid size-8 place-content-center rounded-full border border-Grey/600 bg-Grey/900 text-white shadow-md transition-transform duration-300 hover:scale-110'>
            {exists ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
              </svg>
            )}
          </button>
        </DropdownTrigger>
        <DropdownMenu
          variant='faded'
          aria-label='Card actions'
          itemClasses={{
            base: [
              'rounded-md',
              'border-none',
              'text-default-500',
              'data-[hover=true]:text-foreground',
              'data-[hover=true]:bg-Primary/500',
              'data-[selectable=true]:focus:bg-Primary/500',
              'data-[focus-visible=true]:ring-Primary/700',
            ],
          }}
          onAction={(key) => {
            if (key === 'add_to_list') disclosure.onOpen();
          }}
        >
          <DropdownItem
            key='watchlist'
            startContent={exists ? WATCHLIST_ADDED_ICON : WATCHLIST_ICON}
            onPress={onToggleToWatchlist}
          >
            {exists ? 'Already added' : 'Add to watchList'}
          </DropdownItem>
          <DropdownItem key='add_to_list' startContent={ADD_TO_LIST_ICON}>
            Add to list
          </DropdownItem>
          <DropdownItem key='favorite' startContent={FAVORITE_ICON}>
            Favorite
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <AddToList disclosure={disclosure} />
    </>
  );
}
