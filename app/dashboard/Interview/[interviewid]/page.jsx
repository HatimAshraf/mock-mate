'use client';
import { db } from '@/utils/db';
import { mockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react';

function Interview({ params }) {
  useEffect(() => {
    console.log('params:', params.interviewid);
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(mockInterview)
      .where(eq(mockInterview.mockId, params.interviewid));
    console.log('results:', result);
  };
  return <div>Interview</div>;
}

export default Interview;
