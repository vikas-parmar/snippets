'use client';
import { useUser } from '@clerk/nextjs';
import Loader from '@/app/loader';
import Feed from '@/components/feed';

export default function Home() {
  const { user, isLoaded } = useUser();

  if (!user && !isLoaded) return <Loader />;
  return <Feed />;
}
