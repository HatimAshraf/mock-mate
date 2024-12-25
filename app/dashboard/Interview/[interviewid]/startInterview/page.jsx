'use client';
import { db } from '@/utils/db';
import { mockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview() {
  const params = useParams();
  const generatedId = params.interviewid;

  const [interviewData, setinterviewData] = useState();
  const [mockInterviewQuestion, setmockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setactiveQuestionIndex] = useState(0);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(mockInterview)
      .where(eq(mockInterview.mockId, generatedId));

    // if (result.length === 0) {
    //   console.error('No data found');
    //   return;
    // } else {
    //   console.log('data found');
    // }
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    if (!Array.isArray(jsonMockResp)) {
      console.error('Invalid JSON format:', jsonMockResp);
      return;
    }
    // console.log(jsonMockResp);
    setmockInterviewQuestion(jsonMockResp);
    setinterviewData(result[0]);
  };

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setactiveQuestionIndex={setactiveQuestionIndex}
        />

        <RecordAnsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setactiveQuestionIndex={setactiveQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className='flex justify-center gap-6 mt-10'>
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setactiveQuestionIndex(activeQuestionIndex - 1)}
            variant='outline'
            className='p-6 text-md font-medium'
          >
            Back
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            className='p-6 text-md font-medium'
            onClick={() => setactiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Link
            href={'/dashboard/Interview/' + interviewData?.mockId + '/feedback'}
          >
            <Button className='p-6 text-md font-medium'>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
