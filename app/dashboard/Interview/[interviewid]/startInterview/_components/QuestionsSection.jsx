import { Lightbulb } from 'lucide-react';
import React from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  return (
    <div className='p-5 border rounded-md'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion.map((question, index) => (
          <h2
            className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer ${
              activeQuestionIndex === index && 'bg-primary text-white'
            }`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>
      <h2 className='font-bold text-sm md:text-lg lg:text-xl mt-5 mb-10'>
        {mockInterviewQuestion[activeQuestionIndex]?.question}
      </h2>
      <div className='border border-secondary bg-slate-100 p-5 rounded-md'>
        <h2 className='flex items-center gap-1 mb-2'>
          <Lightbulb />
          <br />
          <strong>Information:</strong>
        </h2>
        <h2>
          Click on 'Record Answer' when you're ready to answer the question. At
          the end of the interview, we will provide you with feedback, including
          the correct answer for each question and your response for comparison.
        </h2>
      </div>
    </div>
  );
}

export default QuestionsSection;
