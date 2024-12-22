import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './utils/schema.js',
  dbCredentials: {
    url: 'postgresql://owner:Grflg6hNZ4kL@ep-hidden-cloud-a5p1adi5.us-east-2.aws.neon.tech/mockMate?sslmode=require',
  },
});
