'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@nextui-org/button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import { signInAction, signUpAction } from './actions';

export default function Form({ type }: { type: 'signin' | 'signup' }) {
  const [errors, formAction, isPending] = useActionState(type === 'signin' ? signInAction : signUpAction, null);
  // const errors = {}
  // const isPending = false;

  useEffect(() => {
    if (errors?.message) toast.error(errors.message);
  }, [errors]);

  return (
    <form className='flex flex-col gap-4' action={formAction}>
      {type === 'signup' && (
        <Input
          type='text'
          name='full_name'
          icon='full_name'
          label='Full Name'
          placeholder='eg. Walid'
          defaultValue={'Walid'}
          error={errors?.full_name?.[0]}
        />
      )}
      <Input
        type='email'
        name='email'
        label='Email'
        placeholder='eg. hello@example.com'
        defaultValue={'walid@gmail.com'}
        error={errors?.email?.[0]}
      />
      <PasswordInput
        name='password'
        label='Password'
        placeholder='*********'
        defaultValue={'password'}
        error={errors?.password?.[0]}
      />
      <Button className='mt-5 w-full' color='primary' type='submit' isLoading={isPending}>
        {type === 'signin' ? (isPending ? 'Signing in...' : 'Sign In') : null}
        {type === 'signup' ? (isPending ? 'Signing up...' : 'Sign Up') : null}
      </Button>
    </form>
  );
}
