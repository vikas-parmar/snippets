import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Component, CookingPot, Music4, TentTree } from 'lucide-react';
import { Button } from './ui/button';

const SidebarRight = () => {
  return (
    <div className="fixed right-0 top-0 flex h-full w-80 flex-col justify-between border-l bg-white p-4">
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold">Suggestions</h3>
        <div className="space-y-3">
          {[
            { name: 'Nick Shelburne', username: '@nickshelburne' },
            { name: 'Brittni Lando', username: '@brittnilando' },
            { name: 'Ivan Shevchenko', username: '@ivanshevchenko' },
          ].map((user) => (
            <div key={user.name} className="flex items-center gap-3">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" className="h-full w-full object-cover" />
                <AvatarFallback className="flex-1">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 shrink-0">
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
  );
};

export default SidebarRight;
