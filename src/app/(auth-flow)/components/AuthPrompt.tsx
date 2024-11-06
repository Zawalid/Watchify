'use client';

import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signInWithGoogleAction } from '../actions/auth';
import { GOOGLE_ICON } from '@/components/ui/Icons';

export default function AuthPrompt() {
  const pathname = usePathname();

  return (
    <>
      <div className='mb-7'>
        <h1 className='text-4xl font-bold text-Primary/50'>
          {pathname === '/signin' ? 'Welcome Back' : 'Create an Account'}
        </h1>
        <p className='text-Grey/300'>
          {pathname === '/signin'
            ? 'Welcome Back. Please enter your details.'
            : 'Join us today. Please fill in your information to create an account.'}
        </p>
      </div>

      <p className='order-3 text-center text-sm text-Grey/300'>
        {pathname === '/signin' ? "Don't have an account?" : 'Already have an account?'}
        <Link
          href={pathname === '/signin' ? '/signup' : '/signin'}
          className='ml-1 text-Primary/400 transition-colors duration-200 hover:text-Primary/500'
        >
          {pathname === '/signin' ? 'Sign Up' : 'Sign In'}
        </Link>
      </p>

      <p className='order-2 text-center text-sm text-Grey/300'>or</p>
      <form
        className='order-2 h-12'
        action={async () => await signInWithGoogleAction(pathname as '/signin' | '/signup')}
      >
        <Button className='w-full bg-White/100 text-black hover:bg-White/75' startContent={GOOGLE_ICON} type='submit'>
          Continue with Google
        </Button>
      </form>
    </>
  );
}
