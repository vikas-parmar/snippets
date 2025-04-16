'use client';
import { useUser } from '@clerk/nextjs';
import { ImageIcon, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NewPost = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-center bg-gray-50 py-4">
      <Card className="fixed bottom-6 m-0 w-[624] shadow-sm">
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
  );
};

export default NewPost;
