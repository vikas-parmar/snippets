'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useClerk, useUser } from '@clerk/nextjs';
import {
  MessageCircle,
  Heart,
  MoreHorizontal,
  ImageIcon,
  MapPin,
  Settings,
  FileText,
  User2Icon,
  Music4,
  CookingPot,
  TentTree,
  Component,
} from 'lucide-react';
import Loader from '@/app/loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const { user, isLoaded } = useUser();
  const { openUserProfile } = useClerk();

  if (!user && !isLoaded) return <Loader />;
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="flex w-64 flex-col gap-4 border-r bg-white p-4">
        <Button
          variant="ghost"
          onClick={() => openUserProfile()}
          className="mb-4 flex h-fit items-center gap-3"
        >
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user?.imageUrl}
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
          <div>
            <h2 className="font-semibold">{user?.fullName}</h2>
            <p className="text-sm text-gray-500">@{user?.username}</p>
          </div>
        </Button>

        <Button
          variant="default"
          className="w-full justify-start gap-2 bg-black text-white hover:bg-gray-800"
        >
          <FileText size={18} /> News Feed
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <MessageCircle size={18} /> Messages
          <span className="ml-auto rounded-full bg-black px-2 py-0.5 text-xs text-white">4</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <User2Icon size={18} /> Friends
          <span className="ml-auto rounded-full bg-purple-500 px-2 py-0.5 text-xs text-white">
            3
          </span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <ImageIcon size={18} /> Media
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Settings size={18} /> Settings
        </Button>

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

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <Tabs defaultValue="recents" className="mb-6">
            <TabsList className="h-auto w-full justify-start gap-2 bg-transparent p-0">
              <TabsTrigger
                value="recents"
                className="border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
              >
                Recents
              </TabsTrigger>
              <TabsTrigger
                value="friends"
                className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:bg-transparent data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
              >
                Friends
              </TabsTrigger>
              <TabsTrigger
                value="popular"
                className="border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:bg-transparent data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
              >
                Popular
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-6">
            {/* Post */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center p-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>GL</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="font-semibold">George Lobko</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="mb-4">
                  Hi everyone, today I was on the most beautiful mountain in the world 😍, I also
                  want to say hi to
                  <Link href="#" className="mx-1 text-purple-600">
                    @Silena
                  </Link>
                  <Link href="#" className="mx-1 text-purple-600">
                    @Olya
                  </Link>
                  and
                  <Link href="#" className="mx-1 text-purple-600">
                    @Davis
                  </Link>
                  !
                </p>
                <div className="grid grid-cols-3 gap-2 overflow-hidden rounded-xl">
                  <Image
                    src="/placeholder.svg"
                    alt="Mountain view"
                    width={300}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                  <Image
                    src="/placeholder.svg"
                    alt="Mountain view"
                    width={300}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                  <Image
                    src="/placeholder.svg"
                    alt="Mountain view"
                    width={300}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-4 p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ImageIcon className="h-4 w-4" />
                  6355
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Heart className="h-4 w-4" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Comment
                </Button>
                <div className="ml-auto flex gap-1">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs">
                    ❤️
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-xs">
                    🔥
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs">
                    🚀
                  </span>
                </div>
              </CardFooter>
            </Card>

            {/* Share Something Card */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>
                      {user?.fullName
                        ?.split(' ')
                        .map((i) => i.charAt(0))
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Share something..."
                      className="w-full rounded-lg bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <ImageIcon size={16} /> File
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <ImageIcon size={16} /> Image
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <MapPin size={16} /> Location
                      </Button>
                      <Button variant="outline" size="sm" className="ml-auto gap-2">
                        Public
                      </Button>
                      <Button className="bg-black text-white hover:bg-gray-800">Send</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="flex w-80 flex-col justify-evenly border-l bg-white p-4">
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">Suggestions</h3>
          <div className="space-y-3">
            {[
              { name: 'Nick Shelburne', username: '@nickshelburne' },
              { name: 'Brittni Lando', username: '@brittnilando' },
              { name: 'Ivan Shevchenko', username: '@ivanshevchenko' },
            ].map((user) => (
              <div key={user.name} className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.username}</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-full">
                  Follow
                </Button>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-purple-600">
              See all
            </Button>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold">Recommendations</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-gray-100 p-4 text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                <Component className="h-6 w-6" />
              </div>
              <p className="font-medium">UI/UX</p>
            </div>
            <div className="rounded-xl bg-pink-100 p-4 text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                <Music4 className="h-6 w-6" />
              </div>
              <p className="font-medium">Music</p>
            </div>
            <div className="rounded-xl bg-amber-100 p-4 text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                <CookingPot className="h-6 w-6" />
              </div>
              <p className="font-medium">Cooking</p>
            </div>
            <div className="rounded-xl bg-purple-100 p-4 text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                <TentTree className="h-6 w-6" />
              </div>
              <p className="font-medium">Hiking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
