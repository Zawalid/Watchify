'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { changeEmailSchema } from '@/lib/validation';
import Modal from '@/components/ui/Modal';
import { Button } from '@nextui-org/button';
import { ModalBody, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import { UPDATE_ICON } from '@/components/ui/Icons';

type FormData = z.infer<typeof changeEmailSchema>;

export default function ChangeEmail({ email }: { email?: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(changeEmailSchema), mode: 'onChange' });
  const disclosure = useDisclosure();

  return (
    <>
      <div className='flex items-center gap-3'>
        <Input defaultValue={email} parentclassname='flex-1' type='email' label='Email' readOnly />
        <Button isIconOnly color='primary' size='lg' onPress={disclosure.onOpen}>
          {UPDATE_ICON}
        </Button>
      </div>
      <Modal disclosure={disclosure} className='max-w-xl'>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col'>
              <h4 className='text-lg font-semibold text-Primary/100'>Change email address</h4>
              <p className='text-sm text-Grey/300'>
                Please enter your new email address and password to change your email address.
              </p>
            </ModalHeader>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <ModalBody className='flex flex-col gap-5'>
                <Input
                  {...register('email')}
                  type='email'
                  label='Email'
                  placeholder='Your Email'
                  error={errors.email?.message}
                />
                <Input
                  {...register('confirm_email')}
                  type='email'
                  label='Confirm Email'
                  error={errors.confirm_email?.message}
                />
                <PasswordInput
                  {...register('password')}
                  name='password'
                  label='Your Password'
                  error={errors.password?.message}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className='bg-Grey/800 hover:bg-Grey/700'
                  onPress={() => {
                    reset();
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button color='primary' type='submit' isLoading={isSubmitting} isDisabled={!isValid}>
                  Change Email
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </Modal>
    </>
  );
}
