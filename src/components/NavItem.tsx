'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RoughNotation } from 'react-rough-notation';

export default function NavItem({ link: { label, href, icon, checks } }: { link: Link }) {
  const pathname = usePathname();

  const isActive = pathname === href || (checks && checks.some((c) => pathname.includes(c)));

  return (
    <RoughNotation type='circle' show={isActive} color='#1ea5fc' padding={10} strokeWidth={2}>
      <li className='group'>
        <Link
          href={href}
          className={`flex items-center gap-2 font-medium transition-colors duration-300 hover:text-Grey/50 group-has-[.active]:font-semibold group-has-[.active]:text-Primary/400 ${isActive ? 'text-Grey/50' : 'text-Grey/300'}`}
        >
          {label}
          {icon}
        </Link>
      </li>
    </RoughNotation>
  );
}
