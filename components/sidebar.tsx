'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { SignOutButton, useClerk, useUser } from '@clerk/nextjs';
import { MessageCircle, ImageIcon, Settings, FileText, User2Icon } from 'lucide-react';
import Loader from '@/app/loader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const { user, isLoaded } = useUser();
  const { openUserProfile } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const navList = [
    { name: 'News Feed', icon: <FileText size={18} />, path: '/' },
    { name: 'Messages', icon: <MessageCircle size={18} />, path: '/messages' },
    { name: 'Friends', icon: <User2Icon size={18} />, path: '/friends' },
    { name: 'Media', icon: <ImageIcon size={18} />, path: '/media' },
    { name: 'Settings', icon: <Settings size={18} />, path: '/settings' },
  ];

  if (!user && !isLoaded) return <Loader />;

  return (
    <div className="hidden w-64 flex-col gap-4 border-r bg-white p-4 md:flex">
      <Button
        variant="ghost"
        onClick={() => openUserProfile()}
        className="mb-4 flex h-fit items-center gap-3"
      >
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400">
            {user?.imageUrl && (
              <img
                src={user.imageUrl || '/placeholder.svg'}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
          </div>
        </div>
        <div>
          <h2 className="font-semibold">{user?.fullName}</h2>
          <p className="text-sm text-gray-500">@{user?.username}</p>
        </div>
      </Button>

      <div className="space-y-1">
        {navList.map((item) => (
          <Button
            key={item.name}
            variant={isActive(item.path) ? 'default' : 'ghost'}
            className={cn(
              'w-full justify-start gap-2',
              isActive(item.path) ? 'bg-black text-white hover:bg-gray-800' : 'text-gray-700'
            )}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon} {item.name}
          </Button>
        ))}
      </div>

      <SignOutButton>
        <Button variant="destructive" className="mt-2 w-full">
          Log Out
        </Button>
      </SignOutButton>

      <div className="mt-auto rounded-xl bg-gray-50 p-4">
        <div className="text-center">
          <h3 className="mb-2 font-medium">Download the App</h3>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-u3LZ1iAc2Eio5aUb0z12IKCA22XYnE.png"
            alt="App QR Code"
            width={120}
            height={120}
            className="mx-auto mb-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
