import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cowatzbcuodizligjuti.supabase.co';
// TODO: Replace with your actual Supabase anon key
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseKey);
