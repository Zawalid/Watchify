'use client';

import { signOutAction } from '@/app/(auth-flow)/actions/auth';
import { Button } from '@nextui-org/button';
import { Checkbox } from '@nextui-org/checkbox';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { useState } from 'react';

export default function SignOutModal({ disclosure }: { disclosure: disclosure }) {
  const [confirmation, setConfirmation] = useState<'enabled' | 'disabled'>('enabled');
  const { isOpen, onOpenChange } = disclosure;

  return (
    <Modal
      placement='center'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop='blur'
      classNames={{
        body: 'py-6',
        backdrop: 'bg-black/50 backdrop-blur-[3px]',
        base: 'border-border blur-bg text-[#a8b0d3]',
        header: 'border-b-[1px] border-border',
        footer: 'border-t-[1px] border-border',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex items-center gap-4'>
              <div className='grid size-10 place-content-center rounded-full bg-Warning/600 text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15'
                  />
                </svg>
              </div>

              <h4 className='text-xl font-semibold text-Primary/100'>Sign Out</h4>
            </ModalHeader>
            <ModalBody>
              <p className='text-Grey/100'>Are you sure you want to sign out?</p>
              <div className='flex items-center gap-3'>
                <Checkbox
                  isSelected={confirmation === 'disabled'}
                  onValueChange={() => setConfirmation(confirmation === 'disabled' ? 'enabled' : 'disabled')}
                  classNames={{ label: 'text-Grey/300 text-sm' }}
                >
                  Don&apos;t show this message again
                </Checkbox>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button className='bg-Grey/800 hover:bg-Grey/700' onPress={onClose}>
                Cancel
              </Button>
              <Button
                color='danger'
                onPress={() => {
                  signOutAction(confirmation);
                  onClose();
                }}
              >
                Sign Out
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
