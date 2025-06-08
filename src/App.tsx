import React from 'react';
import './App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthContextProvider } from '@/context/AuthContext';
import { AppSettingsProvider } from '@/context/AppSettingsContext';
import { SiteWrapper } from '@/components/SiteWrapper';
import { queryClient } from '@/utils/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthContextProvider>
          <AppSettingsProvider>
            <SiteWrapper />
            <Toaster />
          </AppSettingsProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
