'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import Input from '@/components/ui/Input';
import { profileSchema } from '@/lib/validation';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import ChangeEmail from './ChangeEmail';
import Textarea from '@/components/ui/Textarea';

type FormData = z.infer<typeof profileSchema>;

export default function Details({ user }: { user: Profile | null }) {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, defaultValues, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: { name: user?.name },
  });
  const [parent] = useAutoAnimate();

  const avatar = user?.avatar ?? `data:image/png;base64,${user?.initialsAvatar}`;

  const values = watch();
  const isChanged =
    Object.keys(values).some((key) => values[key as keyof FormData] !== defaultValues?.[key as keyof FormData]) &&
    !Object.keys(errors).length;

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <form className='flex flex-col gap-10' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center gap-5'>
          <Avatar
            src={avatar}
            isBordered
            className='!size-20'
            classNames={{
              base: avatar ? 'bg-white' : 'bg-gradient-to-br  from-[#7b6ef6] to-[#1ea5fc]',
              icon: 'text-Primary/100',
            }}
            color='secondary'
            showFallback
          />
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <Button color='primary' size='sm'>
                Change Avatar
              </Button>
              <Button color='danger' variant='ghost' size='sm'>
                Remove Avatar
              </Button>
            </div>
            <p className='text-sm text-Grey/500'>
              Pick a photo up to 5MB <span className='text-xs text-Grey/300 font-semibold'>(JPG, PNG, JPEG, SVG)</span>
              . Your avatar photo will be public.
            </p>
          </div>
        </div>
        <Input {...register('name')} icon='name' label='Name' placeholder='You Name' error={errors.name?.message} />
        <ChangeEmail email={user?.email} />
        <Textarea label='Other Info' placeholder='To be added later...' defaultValue='To be added later...' readOnly />
      </div>
      <div className='flex items-center justify-end gap-4' ref={parent}>
        {isChanged && isValid && (
          <>
            <Button className='bg-Grey/800 hover:bg-Grey/700' onPress={() => reset()}>
              Cancel
            </Button>
            <Button color='primary' type='submit' isLoading={isSubmitting}>
              Save Changes
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
