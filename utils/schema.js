import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const mockInterview = pgTable('mockInterview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonMockResp').notNull(),
  jobPosition: varchar('jobPosition').notNull(),
  jobDescription: varchar('jobDescription').notNull(),
  jobExperience: varchar('jobExperience').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt'),
  mockId: varchar('mockId').notNull(),
});

export const UserAnswer = pgTable('UserAnswer', {
  id: serial('id').primaryKey(),
  mockIdRef: varchar('mockIdRef').notNull(),
  question: varchar('question').notNull(),
  correctAnswer: varchar('correctAnswer').notNull(),
  userAns: text('userAns'),
  feedback: text('feedback'),
  rating: varchar('rating'),
  userEmail: varchar('userEmail'),
  createdAt: varchar('createdAt'),
  updatedAt: varchar('updatedAt'),
});
