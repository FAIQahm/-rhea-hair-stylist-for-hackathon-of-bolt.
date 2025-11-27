import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserSession {
  id: string;
  user_id: string;
  face_shape: string | null;
  skin_undertone: string | null;
  current_hairstyle: string | null;
  preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
}
