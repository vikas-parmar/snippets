'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { SignOutButton, useUser } from '@clerk/nextjs';
import {
  MessageCircle,
  ImageIcon,
  Settings,
  FileText,
  User2Icon,
  LogOutIcon,
  PackagePlus,
  UserRoundPen,
} from 'lucide-react';
import Loader from '@/app/loader';
import { Button } from '@/components/ui/button';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { cn } from '@/lib/utils';

const SidebarLeft = () => {
  const { user, isLoaded } = useUser();
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
    <div className="fixed left-0 top-0 hidden h-full w-64 flex-col gap-4 border-r bg-white p-4 md:flex">
      <Menubar className="h-fit border-none p-0 shadow-none">
        <MenubarMenu>
          <MenubarTrigger className="flex w-full cursor-pointer items-center justify-center gap-2 p-2">
            {user?.imageUrl && (
              <Image
                src={user.imageUrl || '/placeholder.svg'}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <h2 className="font-semibold">{user?.fullName}</h2>
              <p className="text-sm text-gray-500">@{user?.username}</p>
            </div>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <div className="flex cursor-pointer items-center justify-center gap-2">
                <UserRoundPen size={14} />
                Manage Account
              </div>
            </MenubarItem>
            <MenubarItem>
              <div className="flex cursor-pointer items-center justify-center gap-2">
                <PackagePlus size={14} />
                New Post
              </div>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem className="text-red-500 hover:text-red-600">
              <SignOutButton>
                <div className="flex cursor-pointer items-center justify-center gap-2">
                  <LogOutIcon size={14} />
                  Sign Out
                </div>
              </SignOutButton>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

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

export default SidebarLeft;
