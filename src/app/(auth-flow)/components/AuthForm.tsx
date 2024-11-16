'use client';

import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import { signInAction, signUpAction } from '../actions/auth';
import Link from 'next/link';
import { useAction } from '@/hooks/useAction';
import { Button } from '@nextui-org/button';


// Todo : Remove default values

export default function Form({ type }: { type: 'signin' | 'signup' }) {
  const { errors, formAction, isPending } = useAction(type === 'signin' ? signInAction : signUpAction);

  return (
    <form className='flex flex-col gap-4' action={formAction}>
      {type === 'signup' && (
        <Input
          name='name'
          icon='name'
          label='Name'
          placeholder='eg. John Doe'
          defaultValue={'Walid Zakan'}
          error={errors?.name?.[0]}
        />
      )}
      <Input type='email' name='email' label='Email' defaultValue={'walid@gmail.com'} error={errors?.email?.[0]} />
      <PasswordInput name='password' label='Password' defaultValue={'password'} error={errors?.password?.[0]} />
      {type === 'signin' && (
        <Link
          href='/forgot-password'
          className='ml-auto w-fit text-end text-sm text-Primary/400 transition-colors duration-200 hover:text-Primary/500'
        >
          Forgot your password?
        </Link>
      )}
      <Button className='w-full' color='primary' type='submit' isLoading={isPending}>
        {type === 'signin' ? (isPending ? 'Signing in...' : 'Sign In') : null}
        {type === 'signup' ? (isPending ? 'Signing up...' : 'Sign Up') : null}
      </Button>
    </form>
  );
}
