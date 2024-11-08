'use client';

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/avatar';
import { useDisclosure } from '@nextui-org/modal';
import { signOutAction } from '@/app/(auth-flow)/actions/auth';
import { SETTINGS_ICON, SIGN_OUT_ICON } from './ui/Icons';
import ConfirmationModal from './ConfirmationModal';

export default function UserDropdown({ user }: { user: Profile | null }) {
  const disclosure = useDisclosure();
  if (!user) return null;

  const avatar = user.avatar ?? `data:image/png;base64,${user.initialsAvatar}`;

  return (
    <>
      <Dropdown
        classNames={{ content: 'blur-bg  backdrop-blur-2xl' }}
        backdrop='opaque'
        radius='sm'
        placement='bottom-end'
      >
        <DropdownTrigger>
          <Avatar
            src={avatar}
            isBordered
            classNames={{
              base: avatar ? 'bg-white' : 'bg-gradient-to-br  from-[#7b6ef6] to-[#1ea5fc]',
              icon: 'text-Primary/100',
            }}
            color='secondary'
            size='sm'
            showFallback
            as='button'
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Profile Actions'
          variant='faded'
          itemClasses={{
            base: [
              'rounded-md',
              'border-none',
              'text-default-500',
              'data-[hover=true]:text-foreground data-[disabled=true]:opacity-100',
            ],
          }}
          disabledKeys={['profile']}
          onAction={(key) => {
            if (key === 'sign out') {
              if (user.preferences?.sign_out_confirmation === 'disabled') signOutAction();
              else disclosure.onOpen();
            }
          }}
        >
          <DropdownSection showDivider>
            <DropdownItem key='profile' className='cursor-auto data-[hover=true]:bg-transparent'>
              <h5 className='text-base font-bold text-Primary/100'>{user.name}</h5>
              <h6 className='font-medium text-Primary/200'>{user.email}</h6>
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            key='settings'
            href='/settings'
            className='data-[hover=true]:bg-Black/20'
            startContent={SETTINGS_ICON}
          >
            Settings
          </DropdownItem>
          <DropdownItem
            key='sign out'
            color='danger'
            variant='solid'
            className='data-[focus-visible=true]:ring-danger-700'
            startContent={SIGN_OUT_ICON}
          >
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ConfirmationModal
        disclosure={disclosure}
        icon={SIGN_OUT_ICON}
        heading='Sign Out'
        message='Are you sure you want to sign out?'
        confirmText='Sign Out'
        action={signOutAction}
      />
    </>
  );
}
