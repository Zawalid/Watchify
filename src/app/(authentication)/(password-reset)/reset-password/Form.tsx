'use client';

import { useAction } from '@/hooks/useAction';
import { Button } from '@nextui-org/button';
import { resetPassword } from '../actions';
import PasswordInput from '@/components/ui/PasswordInput';

export default function Form({ userId, secret }: { userId?: string; secret?: string }) {
  const { errors, formAction, isPending } = useAction((_, formData) => resetPassword({ userId, secret }, formData));

  return (
    <form action={formAction} className='flex flex-col gap-5'>
      <PasswordInput
        name='password'
        label='Password'
        placeholder='*********'
        defaultValue={'password'}
        error={errors?.password?.[0]}
      />
      <PasswordInput
        name='confirm_password'
        label='Confirm Password'
        placeholder='*********'
        defaultValue={'password'}
        error={errors?.confirm_password?.[0]}
      />
      <Button className='w-full bg-Primary/500 text-white hover:bg-Primary/600' type='submit' isLoading={isPending}>
        {isPending ? 'Resetting Password...' : 'Reset Password'}
      </Button>
    </form>
  );
}
