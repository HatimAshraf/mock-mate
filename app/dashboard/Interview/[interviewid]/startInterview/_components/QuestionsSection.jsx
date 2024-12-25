import { useState, useEffect } from 'react';
import { Lightbulb, LoaderCircle, Volume2Icon } from 'lucide-react';
import React from 'react';

function QuestionsSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  setactiveQuestionIndex,
}) {
  // State to track the active question index and whether speech is active
  //   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [femaleVoice, setFemaleVoice] = useState(null);

  // Load available voices on component mount
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Find a female voice (e.g., English or general female voice)
      const female = voices.find(
        (voice) =>
          voice.name.includes('Google UK English Female') ||
          voice.gender === 'female'
      );
      setFemaleVoice(female || voices[0]); // Fallback to the first available voice
    };

    // Load voices asynchronously (browser-dependent)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  const textToSpeech = (text) => {
    if ('SpeechSynthesis' in window && femaleVoice) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.voice = femaleVoice;

      // Event listeners to track speaking state
      speech.onstart = () => setIsSpeaking(true);
      speech.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(speech);
    } else {
      alert(
        'Sorry, Your Browser Does not Support text to speech or no female voice available.'
      );
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stops ongoing speech
      setIsSpeaking(false); // Reset the speaking state
    }
  };

  return (
    <div className='p-5 border rounded-md'>
      {/* Question List Section */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer ${
              activeQuestionIndex === index ? 'bg-primary text-white' : ''
            }`}
            onClick={() => setactiveQuestionIndex(index)} // Update active question
          >
            Question # {index + 1}
          </h2>
        ))}
      </div>

      {/* Active Question Section */}
      <h2 className='font-bold text-sm md:text-lg lg:text-xl mt-5 mb-5'>
        {mockInterviewQuestion[activeQuestionIndex]?.question ||
          'Loading Questions...'}
      </h2>

      {/* Speech Icon Section */}
      <Volume2Icon
        className={`mb-5 cursor-pointer ${isSpeaking ? 'text-primary' : ''}`}
        onClick={() =>
          isSpeaking
            ? stopSpeaking() // Double-tap to stop speaking
            : textToSpeech(mockInterviewQuestion[activeQuestionIndex].question)
        }
      />

      {/* Information Section */}
      <div className='border border-secondary bg-slate-100 p-5 rounded-md'>
        <h2 className='flex items-center gap-1 mb-2'>
          <Lightbulb />
          <strong>Information:</strong>
        </h2>
        <p>
          Click on 'Start Recording' when you're ready to answer the question.
          At the end of the interview, we will provide you with feedback,
          including the correct answer for each question and your response for
          comparison.
        </p>
      </div>
    </div>
  );
}

export default QuestionsSection;
