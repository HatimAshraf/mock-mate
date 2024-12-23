'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';

function RecordAnsSection() {
  const [userAnswer, setuserAnswer] = useState('');
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setuserAnswer((prev) => prev + result?.transcript);
    });
  }, [results]);

  const SaveUserAnswer = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center border rounded-lg'>
        <Image
          src={'/webcam.png'}
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
      <div>
        <Button
          variant='ghost'
          className='absolute right-[130px] italic'
          onClick={() => console.log(userAnswer)}
        >
          Show Answer
        </Button>
      </div>
    </>
  );
}

export default RecordAnsSection;
