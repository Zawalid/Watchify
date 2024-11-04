import Image from 'next/image';
import Link from 'next/link';
import UserDropdown from './UserDropdown';
import { getUser } from '@/lib/appwrite';

type NavItemProps = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

const links: Links = {
  authenticated: [
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/explore' },
    { label: 'Suggestions', href: '/suggestions' },
    { label: 'Movies', href: '/movies' },
    { label: 'Tv Shows', href: '/tv-shows' },
  ],
  unauthenticated: [
    { label: 'Explore', href: '/explore' },
    {
      label: 'Suggest me',
      href: '/suggest',
    },
    {
      label: 'Sign In',
      href: '/signin',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6 rotate-180'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
          />
        </svg>
      ),
    },
  ],
};

function NavItem({ label, href, icon }: NavItemProps) {
  return (
    <li className='group'>
      <Link
        href={href}
        className='flex items-center gap-2 font-medium text-Grey/300 transition-colors duration-300 hover:text-Grey/100 group-has-[.active]:font-semibold group-has-[.active]:text-Primary/400'
      >
        {label}
        {icon}
      </Link>
    </li>
  );
}

export default async function Navbar() {
  const user = await getUser();
  const isAuthenticated: boolean = Boolean(user);

  return (
    <nav className='sticky top-0 z-30 mb-12 bg-blur py-3 backdrop-blur-lg'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <Image src='/images/logo.svg' alt='watchfolio' width={40} height={20} />
        </Link>
        <ul className='flex items-center gap-8'>
          {links[isAuthenticated ? 'authenticated' : 'unauthenticated'].map(({ label, href, icon }) => (
            <NavItem key={href} label={label} href={href} icon={icon} />
          ))}
        </ul>
        <UserDropdown user={user} />
      </div>
    </nav>
  );
}
