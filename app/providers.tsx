'use client';

import { ReactNode } from 'react';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import HeaderTabs from '@/components/header-tabs';
import SidebarLeft from '@/components/sidebar-left';
import SidebarRight from '@/components/sidebar-right';
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
        <QueryClientProvider client={queryClient}>
          <div className="flex min-h-screen">
            <SidebarLeft />
            <main className="ml-64 mr-80 flex-1">
              <HeaderTabs />
              <div className="container mx-auto px-4 py-4 md:px-8">{children}</div>
            </main>
            <SidebarRight />
          </div>
        </QueryClientProvider>
      </SignedIn>
      <SignedOut>
        <SignInPage />
      </SignedOut>
      <Toaster />
    </ClerkProvider>
  );
}
