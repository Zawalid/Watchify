import Image from 'next/image';
import Link from 'next/link';
import UserDropdown from './UserDropdown';
import { getUser } from '@/lib/appwrite';
import { SIGN_IN_ICON } from './ui/Icons';

type NavItemProps = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

const links: Links = {
  authenticated: [
    { label: 'Explore', href: '/' },
    { label: 'Watchlist', href: '/watchlist' },
    { label: 'Suggestions', href: '/suggestions' },
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
      icon: SIGN_IN_ICON,
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
