import ChatStuff from '@/components/ChatStuff';
import Link from 'next/link';

function Page(props) {
  const roomId = props.params.id;
  const userName = props.searchParams.user;

  return (
    <div className='flex min-h-[80vh] m-auto flex-col items-center pt-8'>
      <Link href='/'>Kezdőlap</Link>
      <div className='flex w-[50rem] h-[38rem] items-center justify-center'>
        <ChatStuff roomId={roomId} userName={userName} />
      </div>
    </div>
  );
}

export default Page;
