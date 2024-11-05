import { redirect } from 'next/navigation';
import { getUser } from '@/lib/appwrite';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (user) redirect('/');

  return children;
}
