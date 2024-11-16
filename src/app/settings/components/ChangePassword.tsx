'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { changePasswordSchema } from '@/lib/validation';
import Modal from '@/components/ui/Modal';
import { Button } from '@nextui-org/button';
import { ModalBody, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import PasswordInput from '@/components/ui/PasswordInput';

type FormData = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(changePasswordSchema), mode: 'onChange' });
  const disclosure = useDisclosure();

  const close = () => {
    disclosure.onClose();
    reset();
  };

  return (
    <>
      <div className='flex flex-col gap-2'>
        <h4 className='font-semibold text-Grey/300'>Change Password</h4>
        <p className='text-sm text-Grey/300'>Ensure your account is using a long, random password to stay secure.</p>
        <Button color='primary' size='sm' className='w-fit' onPress={disclosure.onOpen}>
          Change Password
        </Button>
      </div>
      <Modal disclosure={disclosure} className='max-w-xl'>
        <ModalHeader className='flex flex-col'>
          <h4 className='text-lg font-semibold text-Primary/100'>Change your password</h4>
          <p className='text-sm text-Grey/300'>
            Please enter your current password and new password to change your password.
          </p>
        </ModalHeader>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <ModalBody className='flex flex-col gap-5'>
            <PasswordInput
              {...register('email')}
              name='password'
              label='Current Password'
              error={errors.email?.message}
            />
            <PasswordInput
              {...register('email')}
              name='new_password'
              label='New Password'
              error={errors.email?.message}
            />
            <PasswordInput
              {...register('email')}
              name='confirm_password'
              label='Confirm Password'
              error={errors.email?.message}
            />
          </ModalBody>
          <ModalFooter>
            <Button className='bg-Grey/800 hover:bg-Grey/700' onPress={close}>
              Cancel
            </Button>
            <Button color='primary' type='submit' isLoading={isSubmitting} isDisabled={!isValid}>
              Change Password
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}
