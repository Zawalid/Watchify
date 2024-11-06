'use client';

import { NextUIProvider } from '@nextui-org/system';

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider className='grid flex-1'>{children}</NextUIProvider>;
}
