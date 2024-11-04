'use client';

import { useAction } from '@/hooks/useAction';
import { signInMagically } from '../../actions';
import { Button } from '@nextui-org/button';

export default function Form({ userId, secret }: { userId?: string; secret?: string }) {
  const { formAction, isPending } = useAction(() => signInMagically(userId, secret));

  return (
    <form action={formAction}>
      <Button color='primary' type='submit' className='w-full' isLoading={isPending}>
        {isPending ? 'Signin In...' : 'Continue'}
      </Button>
    </form>
  );
}
