'use client';

import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signInWithGoogleAction } from '../actions';

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
        <Button
          className='w-full bg-White/100 text-black hover:bg-White/75'
          startContent={
            <svg
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 48 48'
              height='200'
              width='200'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill='#FFC107'
                d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z'
                stroke='none'
              />
              <path
                fill='#FF3D00'
                d='m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z'
                stroke='none'
              />
              <path
                fill='#4CAF50'
                d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z'
                stroke='none'
              />
              <path
                fill='#1976D2'
                d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z'
                stroke='none'
              />
            </svg>
          }
          type='submit'
        >
          Continue with Google
        </Button>
      </form>
    </>
  );
}
