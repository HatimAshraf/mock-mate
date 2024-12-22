'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { chatSession } from '@/utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { mockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { Router, useRouter } from 'next/router';

function Addnewinterview() {
  const [openDialog, setopenDialog] = useState(false);
  const [jobPosition, setjobPosition] = useState('');
  const [jobDescription, setjobDescription] = useState('');
  const [jobExperience, setjobExperience] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [mockQuestions, setmockQuestions] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();
    // console.log(jobPosition, jobDescription, jobExperience);
    const InputPrompt = `Job Position: ${jobPosition},
      Job Description: ${jobDescription},
       Years of Experience: ${jobExperience}, 
       based on the information provided by user please generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answer in jSON format. give Question and answered as field in JSON`;

    const result = await chatSession.sendMessage(InputPrompt);
    const jsonResponse = result.response
      .text()
      .replace('```json', '')
      .replace('```', '');
    const MockQuestions = JSON.parse(jsonResponse);
    console.log(MockQuestions);
    setmockQuestions(MockQuestions);

    if (MockQuestions) {
      const response = await db
        .insert(mockInterview)
        .values({
          jsonMockResp: MockQuestions,
          jobPosition: jobPosition,
          jobDescription: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-YYYY HH:mm:ss'),
          mockId: uuidv4(),
        })
        .returning({ mockId: mockInterview.mockId });

      console.log('Inserted ID: ', response);
    }

    if (response) {
      setopenDialog(false);
      Router.push('dashboard/interview/' + response[0]?.mockId);
    } else {
      console.log('error');
    }

    setisLoading(false);
  };
  return (
    <div>
      <div
        className='bg-secondary p-10 rounded-md hover:scale-105 transition-all hover:shadow-sm cursor-pointer border hover:border-primary'
        onClick={() => setopenDialog(true)}
      >
        <h2 className='text-xl font-medium text-center '> + Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle className='text-2xl'>
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form>
                <div className=''>
                  <h2>
                    Add details about your job position/role, Job description
                    and years of experience.
                  </h2>
                  <div className=''>
                    <div className=' my-3'>
                      <label>Job Title / Job Position</label>
                      <Input
                        placeholder='e.g. Software Engineer, Backend-engineer, Data analysist'
                        required
                        onChange={(e) => setjobPosition(e.target.value)}
                      />
                    </div>
                    <div className='my-3'>
                      <label>Job Description / Tech Stack in use</label>
                      <Textarea
                        placeholder='e.g. JavaScript, React, Node.js, Python, C++'
                        onChange={(e) => setjobDescription(e.target.value)}
                      />
                    </div>
                    <div className='my-3'>
                      <label>Years of Experience</label>
                      <Input
                        placeholder='e.g. 2 years of experience'
                        type='number'
                        onChange={(e) => setjobExperience(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className='flex gap-5 justify-end mt-5'>
                  <Button
                    type='button'
                    variant='ghost'
                    onClick={() => setopenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type='submit' onClick={onSubmit} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <LoaderCircle className='animate-spin' />
                        Generating from AI
                      </>
                    ) : (
                      'Start Interview'
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Addnewinterview;
