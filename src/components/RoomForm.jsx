'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useRouter } from 'next/navigation';

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Minimum 2 karakter' })
    .max(20, { message: 'Maximum 20 karakter' }),
  roomId: z
    .string()
    .min(2, { message: 'Minimum 2 karakter' })
    .max(20, { message: 'Maximum 20 karakter' }),
});

function RoomForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      roomId: '',
    },
  });

  function onSubmit(values) {
    router.push(`/${values.roomId}?user=${values.username}`);
  }

  return (
    <div className='group relative rounded-xl border-black border p-10'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>felhasználónév</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='roomId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>szoba id</FormLabel>
                <FormControl>
                  <Input placeholder='123' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default RoomForm;
