import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL: string = 'https://kybhfvqdkvjbrkmzmnje.supabase.co';
export const SUPABASE_ANON_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5YmhmdnFka3ZqYnJrbXptbmplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxNTk0NjYsImV4cCI6MjExMDczNTQ2Nn0.jqGqpzePGHvjD_RVLx9CpcIbRALXgVrpmQJh4cK5rOw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const isSupabaseKeyConfigured = (): boolean =>
  Boolean(
    SUPABASE_ANON_KEY &&
      SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY' &&
      SUPABASE_ANON_KEY.trim().length > 20
  );
