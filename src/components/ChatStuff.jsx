/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Chat from './Chat';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

function ChatStuff({ userName, roomId }) {
  let socket;
  socket = io('http://localhost:3001');

  useEffect(() => {
    socket.emit('join_room', roomId);
  }, []);

  return (
    <div>
      <Chat socket={socket} roomId={roomId} userName={userName} />
    </div>
  );
}

export default ChatStuff;
