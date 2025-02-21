import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Link href={'/dashboard'}>
        <Button>Click me</Button>
      </Link>
    </div>
  );
}
