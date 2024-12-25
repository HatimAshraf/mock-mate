import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    // router.push(`/dashboard/interview/${interview?.mockId}`);
    router.push('/dashboard/interview/' + interview?.mockId);
  };
  return (
    <div className='border shadow-sm rounded-md p-3 flex flex-col gap-1'>
      <h2 className='font-bold text-lg text-primary'>
        {interview?.jobPosition}
      </h2>
      <h2 className='text-sm textgray-600'>{interview?.jobExperience}</h2>
      <h2 className='text-xs text-gray-400 '>{interview.createdAt}</h2>
      <div className='flex justify-between mt-2 gap-3'>
        <Button variant='outline' size='sm' className='w-full'>
          Feedback
        </Button>
        <Button size='sm' className='w-full' onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
