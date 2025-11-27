'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface AuthContextType {
  user: any;
  loading: boolean;
  signInAnonymously: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
      } else {
        await signInAnonymously();
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signInAnonymously = async () => {
    try {
      const { data, error } = await supabase.auth.signInAnonymously();

      if (error) {
        console.error('Anonymous auth error:', error);
        console.error('Anonymous authentication may not be enabled. Attempting alternative...');

        const testEmail = `guest-${Date.now()}@rhea.app`;
        const testPassword = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: testEmail,
          password: testPassword,
          options: {
            data: {
              is_guest: true
            }
          }
        });

        if (signUpError) {
          console.error('Fallback signup error:', signUpError);
          throw signUpError;
        }

        if (signUpData.user) {
          setUser(signUpData.user);
          return;
        }

        throw new Error('Failed to create guest user');
      }

      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInAnonymously }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
