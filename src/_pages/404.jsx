import Button from '@/components/Button';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className='flex flex-1 flex-col items-center gap-6'>
      <img src='/404.svg' alt='' />
      <div className='flex flex-col items-center gap-1 text-center'>
        <h2 className='text-2xl font-semibold text-Grey/50 sm:text-3xl'>Lost your way?</h2>
        <p className='font-medium text-Grey/300'>
          Oops! This is awkward. You are looking for something that doesn&apos;t <br /> actually
          exist.
        </p>
        <Link to='/'>
          <Button className='mt-6'>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
