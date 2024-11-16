import { getUser } from '@/lib/appwrite';
import Details from '../components/Details';
import ChangePassword from '../components/ChangePassword';
import DeleteAccount from '../components/DeleteAccount';

export default async function Page() {
  const user = await getUser();


  return (
    <div className='flex flex-col gap-8'>
      <div className='space-y-2'>
        <h3 className='text-xl font-semibold text-Primary/100'>Details</h3>
        <p className='text-sm text-Grey/300'>Update your account's profile information and email address.</p>
      </div>
      <Details user={user}  />
      <hr className='border-t-2 border-border' />
      <div className='space-y-2'>
        <h3 className='text-xl font-semibold text-Primary/100'>Security</h3>
        <div className='flex flex-col gap-5'>
          <ChangePassword />
        </div>
      </div>

      <hr className='border-t-2 border-border' />
      <div className='space-y-2'>
        <h3 className='text-xl font-semibold text-Primary/100'>Danger Zone</h3>
        <div className='flex flex-col gap-5'>
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
}
