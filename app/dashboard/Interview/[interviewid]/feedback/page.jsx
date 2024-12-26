'use client';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ChevronDown,
  ChevronRight,
  ChevronRightIcon,
  ChevronUp,
  Home,
  Loader2Icon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function Feedback() {
  const router = useRouter();
  const params = useParams();
  const generatedId = params.interviewid;
  const [feedbackList, setfeedbackList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    setisLoading(true);
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, generatedId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setfeedbackList(result);
    setisLoading(false);
  };
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl text-green-500'>🎉 Congratulations</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback:</h2>
      {feedbackList?.length === 0 ? (
        <h2 className='font-bold text-xl text-gray-500'>No Interview Found</h2>
      ) : (
        <>
          <h2 className='text-primary text-lg my-3'>
            Overall Rating: <strong>7/10</strong>
          </h2>
          <h2 className='text-[16px] w-full text-slate-800 mt-5'>
            Below, you will find the interview questions along with the correct
            answers, your responses, and actionable feedback for improvement
          </h2>
          {isLoading ? (
            <div className='flex justify-center items-center mt-10'>
              <Loader2Icon className='animate-spin' />
            </div>
          ) : (
            feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger className='flex justify-between w-full gap-2 p-4 bg-slate-100 rounded-lg my-3 text-left'>
                  {item.question} <ChevronDown />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className='flex flex-col gap-4'>
                    <h2 className='text-red-500 p-2  text-xl rounded-lg'>
                      Rating: <strong>{item.rating}</strong>
                    </h2>
                    <h2 className='p-4 rounded-lg bg-red-50 text-sm text-red-900'>
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className='p-4 rounded-lg bg-green-50 text-sm text-green-900'>
                      <strong> Correct Answer: </strong>
                      {item.correctAnswer}
                    </h2>
                    <h2 className='p-4 rounded-lg text-sm bg-blue-50 text-primary '>
                      <strong> Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))
          )}
        </>
      )}
      <Button
        className='mt-5 text-primary p-6 text-[15px]'
        variant='outline'
        onClick={() => router.replace('/dashboard')}
      >
        <Home />
        Home
      </Button>
    </div>
  );
}

export default Feedback;
