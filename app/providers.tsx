'use client';

import { ReactNode } from 'react';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import SignInPage from './(auth)/sign-in/[[...sign-in]]/page';

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Configure default query settings
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ClerkProvider>
      <SignedIn>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </SignedIn>
      <SignedOut>
        <SignInPage />
      </SignedOut>
      <Toaster />
    </ClerkProvider>
  );
}
