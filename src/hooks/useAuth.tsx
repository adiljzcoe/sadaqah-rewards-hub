
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithGitHub: () => Promise<{ error: any }>;
  fakeAdminLogin: () => void;
  fakeUserLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  // Create fake admin session directly
  const fakeAdminLogin = () => {
    console.log('Creating fake admin session...');
    
    const fakeAdminUser = {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'admin@test.com',
      user_metadata: { full_name: 'Test Admin' },
      app_metadata: { role: 'admin' },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      email_confirmed_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
      role: 'authenticated',
      phone: '',
      phone_confirmed_at: null,
      last_sign_in_at: new Date().toISOString(),
      identities: []
    } as User;

    const fakeAdminSession = {
      access_token: 'fake-admin-token-' + Date.now(),
      refresh_token: 'fake-admin-refresh-' + Date.now(),
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'bearer',
      user: fakeAdminUser,
    } as Session;

    setUser(fakeAdminUser);
    setSession(fakeAdminSession);
    
    toast({
      title: "Fake Admin Login Success",
      description: "You are now logged in as a test admin.",
    });

    console.log('Fake admin session created:', fakeAdminUser.email);
  };

  // Create fake user session directly
  const fakeUserLogin = () => {
    console.log('Creating fake user session...');
    
    const fakeUser = {
      id: '00000000-0000-0000-0000-000000000002',
      email: 'testuser@example.com',
      user_metadata: { full_name: 'Test User' },
      app_metadata: { role: 'user' },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      email_confirmed_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
      role: 'authenticated',
      phone: '',
      phone_confirmed_at: null,
      last_sign_in_at: new Date().toISOString(),
      identities: []
    } as User;

    const fakeUserSession = {
      access_token: 'fake-user-token-' + Date.now(),
      refresh_token: 'fake-user-refresh-' + Date.now(),
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'bearer',
      user: fakeUser,
    } as Session;

    setUser(fakeUser);
    setSession(fakeUserSession);
    
    toast({
      title: "Fake User Login Success",
      description: "You are now logged in as a test user.",
    });

    console.log('Fake user session created:', fakeUser.email);
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Check your email",
        description: "We've sent you a confirmation link to complete your registration.",
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    }

    return { error };
  };

  const signOut = async () => {
    // Clear fake session if it exists
    if (session?.access_token?.startsWith('fake-')) {
      setUser(null);
      setSession(null);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });

    if (error) {
      toast({
        title: "Google sign in failed",
        description: error.message,
        variant: "destructive",
      });
    }

    return { error };
  };

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });

    if (error) {
      toast({
        title: "GitHub sign in failed",
        description: error.message,
        variant: "destructive",
      });
    }

    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    signInWithGitHub,
    fakeAdminLogin,
    fakeUserLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
