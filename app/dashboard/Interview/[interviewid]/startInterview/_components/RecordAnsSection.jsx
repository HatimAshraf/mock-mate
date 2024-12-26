'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import { UserAnswer } from '@/utils/schema';
import moment from 'moment';

function RecordAnsSection({
  mockInterviewQuestion,
  interviewData,
  activeQuestionIndex,
  setactiveQuestionIndex,
}) {
  const [userAnswerr, setuserAnswerr] = useState('');
  const { user } = useUser();
  const [isLoading, setisLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setuserAnswerr((prev) => prev + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswerr.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswerr]);

  const SaveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setisLoading(true);
    const feedbackPrompt =
      'Question: ' +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ', User Answer: ' +
      userAnswerr +
      ', Depends on question and user answer for give interview question' +
      'please give us rating for answer and feedback as areas of improvement if any ' +
      'in just 3 to 5 lines to improve it in JSON format with rating field and feedback field ';

    const result = await chatSession.sendMessage(feedbackPrompt);
    const MockJsonResp = result.response
      .text() // Replace escaped quotes
      .replace('```json', '') // Remove the JSON code block markers
      .replace('```', ''); // Remove the closing code block markers
    //   console.log(MockJsonResp);
    const jsonFeedback = JSON.parse(MockJsonResp);
    console.log(jsonFeedback);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswerr,
      feedback: jsonFeedback?.feedback,
      rating: jsonFeedback?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD-MM-YYYY HH:mm:ss'),
      updatedAt: moment().format('DD-MM-YYYY HH:mm:ss'),
    });

    if (resp) {
      toast('User Answer recorded successfully');
      setuserAnswerr('');
      setResults([]);
    }

    setResults([]);
    setisLoading(false);
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center border rounded-lg'>
        <Image
          src={'/webcam.png'}
          alt='webcam'
          width={200}
          height={200}
          className='absolute'
        />

        <Webcam
          mirrored={true}
          style={{ height: '350px', width: '100%', zIndex: 10 }}
        />
        <Button
          className='mb-5 p-6 text-md font-medium'
          disabled={isLoading}
          variant='outline'
          onClick={SaveUserAnswer}
        >
          {isRecording ? (
            <h2 className='text-red-600 animate-pulse flex gap-2 justify-center items-center'>
              <StopCircle /> Stop Recording
            </h2>
          ) : (
            <h2 className='text-primary font-bold flex gap-2 justify-center items-center'>
              <Mic /> Start Recording
            </h2>
          )}
        </Button>
      </div>
      <div></div>
    </>
  );
}

export default RecordAnsSection;
