'use client';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { mockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, LoaderCircle, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

function Interview() {
  const params = useParams();
  const generatedId = params.interviewid;
  const [interviewData, setinterviewData] = useState();
  const [webCamEnabled, setwebCamEnabled] = useState();

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(mockInterview)
        .where(eq(mockInterview.mockId, generatedId));
      console.log('results:', result[0].jsonMockResp);
      setinterviewData(result[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='my-10 '>
      <h2 className='font-bold text-2xl'>Let's get Started</h2>
      <div className='grid grid-col-1 md:grid grid-cols-2 gap-10'>
        <div className='flex flex-col my-5 gap-5'>
          <div className='flex flex-col p-5 rounded-lg border gap-5'>
            {interviewData ? (
              <>
                <h2 className='text-lg'>
                  <strong>Job Title / Job Position: </strong>
                  {interviewData.jobPosition}
                </h2>

                <h2 className='text-lg'>
                  {' '}
                  <strong>Job Description: </strong>
                  {interviewData.jobDescription}
                </h2>
                <h2 className='text-lg'>
                  {' '}
                  <strong>Years of Experience: </strong>
                  {interviewData.jobExperience}
                </h2>
              </>
            ) : (
              <>
                <LoaderCircle className='animate-spin' />
                Loading ...
              </>
            )}
          </div>
          <div className='border border-secondary bg-slate-100 p-5 rounded-md'>
            <h2 className='flex items-center gap-1 mb-2'>
              <Lightbulb />
              <br />
              <strong>Information:</strong>
            </h2>
            <h2>
              Enable your webcam and microphone to begin your AI MockMate
              Interview. The interview consists of five questions, and at the
              end, you will receive a detailed report based on your responses.
            </h2>
            <br></br>
            <h2>
              <span className='font-bold'>Note:</span> We do not record your
              video, and you can disable webcam access at any time if you
              prefer.
            </h2>
          </div>
        </div>
        <div className='flex flex-col'>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setwebCamEnabled(true)}
              onUserMediaError={() => setwebCamEnabled(false)}
              style={
                {
                  // width: auto,
                  // height: auto,
                }
              }
            />
          ) : (
            <>
              <WebcamIcon className='h-80 w-auto my-5 p-20 bg-secondary border rounded-md bg-slate-100'></WebcamIcon>
              <div className='flex flex-col justify-center items-center'>
                <Button
                  className='text-lg p-5'
                  variant='ghost'
                  onClick={() => setwebCamEnabled(true)}
                >
                  Click here to enable Webcam and Microphone
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className='flex justify-center items-center mt-16'>
        <Link
          href={
            '/dashboard/Interview/' + params.interviewid + '/startInterview'
          }
        >
          <Button className='text-lg p-8'>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
