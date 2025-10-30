import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Prefer process.env (when built), then expo config extra, else empty string
const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL ??
  (Constants?.expoConfig?.extra?.SUPABASE_URL as string | undefined) ??
  '';
const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
  (Constants?.expoConfig?.extra?.SUPABASE_ANON_KEY as string | undefined) ??
  '';

// Debug / fail early so we get a clear message instead of "supabaseUrl is required"
console.log('Supabase config present:', { hasUrl: !!SUPABASE_URL, hasKey: !!SUPABASE_ANON_KEY });

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase config', { SUPABASE_URL, SUPABASE_ANON_KEY });
  throw new Error(
    'SUPABASE_URL and SUPABASE_ANON_KEY are required. Set EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY in your .env or expo extra.'
  );
}

// Pass AsyncStorage to supabase auth for React Native persistence
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { storage: AsyncStorage },
});

interface AuthContextType {
  session: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setSession(session);
      })();
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    setError(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ session, loading, signIn, signUp, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
