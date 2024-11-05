import { cn } from '@/utils';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import type { JSX } from 'react';

export const icons: Record<IconType, JSX.Element> = {
  name: (
    <svg
      stroke='currentColor'
      fill='none'
      strokeWidth='2'
      viewBox='0 0 24 24'
      strokeLinecap='round'
      strokeLinejoin='round'
      width='24'
      height='24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
      <circle cx='12' cy='7' r='4'></circle>
    </svg>
  ),
  email: (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z'
        stroke='#475069'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9'
        stroke='#475069'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  search: (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        stroke='currentColor'
      ></path>
      <path
        d='M22 22L20 20'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        stroke='currentColor'
      ></path>
    </svg>
  ),
  password: (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z'
        stroke='#475069'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.2802 13.61C15.1502 14.74 13.5302 15.09 12.1002 14.64L9.5102 17.22C9.3302 17.41 8.9602 17.53 8.6902 17.49L7.4902 17.33C7.0902 17.28 6.7302 16.9 6.6702 16.51L6.5102 15.31C6.4702 15.05 6.6002 14.68 6.7802 14.49L9.3602 11.91C8.9202 10.48 9.2602 8.86001 10.3902 7.73001C12.0102 6.11001 14.6502 6.11001 16.2802 7.73001C17.9002 9.34001 17.9002 11.98 16.2802 13.61Z'
        stroke='#475069'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.4496 16.28L9.59961 15.42'
        stroke='#475069'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M13.3949 10.7H13.4039' stroke='#475069' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  ),
  visible: (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.0001 20.27C15.5301 20.27 18.8201 18.19 21.1101 14.59C22.0101 13.18 22.0101 10.81 21.1101 9.39997C18.8201 5.79997 15.5301 3.71997 12.0001 3.71997C8.47009 3.71997 5.18009 5.79997 2.89009 9.39997C1.99009 10.81 1.99009 13.18 2.89009 14.59C5.18009 18.19 8.47009 20.27 12.0001 20.27Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  invisible: (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M14.5299 9.47004L9.46992 14.53C8.81992 13.88 8.41992 12.99 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C12.9899 8.42004 13.8799 8.82004 14.5299 9.47004Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.41992 19.5301C9.55992 20.0101 10.7699 20.2701 11.9999 20.2701C15.5299 20.2701 18.8199 18.1901 21.1099 14.5901C22.0099 13.1801 22.0099 10.8101 21.1099 9.40005C20.7799 8.88005 20.4199 8.39005 20.0499 7.93005'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15.5104 12.7C15.2504 14.11 14.1004 15.26 12.6904 15.52'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M9.47 14.53L2 22' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M22.0003 2L14.5303 9.47'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  title: (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M2.51953 7.11H21.4795'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M8.51953 2.11V6.97'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15.4805 2.11V6.52'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.75 14.45V13.25C9.75 11.71 10.84 11.08 12.17 11.85L13.21 12.45L14.25 13.05C15.58 13.82 15.58 15.08 14.25 15.85L13.21 16.45L12.17 17.05C10.84 17.82 9.75 17.19 9.75 15.65V14.45V14.45Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  link: (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <path
        d='M3.27 12C2.48 11.05 2 9.83 2 8.5C2 5.48 4.47 3 7.5 3H12.5C15.52 3 18 5.48 18 8.5C18 11.52 15.53 14 12.5 14H10'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.73 12C21.52 12.95 22 14.17 22 15.5C22 18.52 19.53 21 16.5 21H11.5C8.48 21 6 18.52 6 15.5C6 12.48 8.47 10 11.5 10H14'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  type?: IconType | 'text';
  icon?: IconType;
  label?: string;
  parentclassname?: string;
  error?: string;
}

export default function Input({ children, type, icon, label, ...props }: InputProps) {
  const { parentclassname, placeholder, error } = props;
  const [parent] = useAutoAnimate();

  return (
    <div className={cn('flex flex-col gap-2', parentclassname)} ref={parent}>
      <div className='relative rounded-xl'>
        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-Grey/600'>
          {icons[type as IconType] || (icon && icons[icon])}
        </span>
        <input
          type={type || 'text'}
          className={cn(
            'peer relative z-10 w-full rounded-xl border-2 border-Grey/800 bg-Black/10 pb-3 pl-14 pr-4 pt-7 text-sm text-Grey/100 outline-none placeholder:text-sm placeholder:text-transparent focus:border-Primary/500 focus:placeholder:text-Grey/600',
            error ? 'border-Error/500 focus:border-Error/500' : 'border-Grey/800 focus:border-Primary/500'
          )}
          placeholder={placeholder}
          {...props}
        />
        <label className='absolute left-14 top-1/2 z-0 -translate-y-1/2 cursor-text text-sm text-Grey/600 transition-all duration-300 focus:text-white peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:text-Grey/400 peer-[&:not(:placeholder-shown)]:z-10 peer-[&:not(:placeholder-shown)]:-translate-y-6 peer-[&:not(:placeholder-shown)]:text-Grey/400'>
          {label}
        </label>

        {children}
      </div>
      {error && <span className='text-sm text-Error/500'>{error}</span>}
    </div>
  );
}
