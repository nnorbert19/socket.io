/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useRef, useState } from 'react';

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
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  message: z
    .string()
    .min(2, { message: 'Minimum 2 karakter' })
    .max(50, { message: 'Maximum 50 karakter' }),
});

function Chat({ socket, roomId, userName }) {
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  useEffect(() => {
    socket.on('receive_msg', (data) => {
      setChat((pre) => [...pre, data]);
    });
  }, [socket]);

  const sendData = async (values) => {
    if (values.message !== '') {
      const msgData = {
        roomId,
        user: userName,
        msg: values.message,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_msg', msgData);
    }
  };

  return (
    <div className='w-[40rem] h-[38rem] flex flex-col justify-between items-center group relative rounded-xl border-black border m-6'>
      <p className='p-4'>
        név: <b>{userName}</b> roomid: <b>{roomId}</b>
      </p>
      <div>
        <ScrollArea className='h-[270px] w-[38rem] p-2 m-4 rounded-md border-black border flex'>
          {chat?.map(({ roomId, user, msg, time }, key) => (
            <div
              key={key}
              className={`flex ${
                user == userName ? 'justify-end' : 'justify-start'
              }`}
            >
              <span
                className={'bg-slate-200 p-2 m-2 rounded-md'}
                style={{ textAlign: user == userName ? 'right' : 'left' }}
              >
                <i>{user}</i>
                <h3 style={{ textAlign: user == userName ? 'right' : 'left' }}>
                  {msg}
                </h3>
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(sendData)}
            className='space-y-8 rounded-xl border-black border p-6 m-4'
          >
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Üzenet</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='valami üzenet'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Küldés</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Chat;
