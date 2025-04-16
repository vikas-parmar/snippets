'use client';
import Image from 'next/image';
import { MessageCircle, Heart, MoreHorizontal, ImageIcon } from 'lucide-react';
import NewPost from '@/components/new-post';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const posts = [
  {
    id: 1,
    user: {
      name: 'George Lobko',
      image: '/placeholder.svg',
    },
    content:
      'Hi everyone, today I was on the most beautiful mountain in the world 😍, I also want to say hi to @Silena, @Olya and @Davis!',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    likes: 6355,
  },
  {
    id: 2,
    user: {
      name: 'John Doe',
      image: '/placeholder.svg',
    },
    content: 'Just finished a great book! Highly recommend it to everyone. 📚',
    images: ['/placeholder.svg', '/placeholder.svg'],
    likes: 1200,
  },
  {
    id: 3,
    user: {
      name: 'Jane Smith',
      image: '/placeholder.svg',
    },
    content: 'Had an amazing day at the beach! 🌊☀️',
    images: ['/placeholder.svg'],
    likes: 450,
  },
  {
    id: 4,
    user: {
      name: 'Alice Johnson',
      image: '/placeholder.svg',
    },
    content: 'Excited for the weekend! 🎉',
    images: [],
    likes: 300,
  },
];
const Feed = () => {
  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id} className="mb-5 shadow-sm">
          <CardHeader className="flex flex-row items-center p-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.user.image} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-semibold">{post.user.name}</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="mb-4">{post.content}</p>
            {post.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 overflow-hidden rounded-xl">
                {post.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Post image ${index + 1}`}
                    width={300}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex items-center gap-4 p-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ImageIcon className="h-4 w-4" />
              {post.likes}
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
      ))}
      {/* Share Something Card */}
      <NewPost />
    </div>
  );
  // return (
  //   <Card className="mb-5 shadow-sm">
  //     <CardHeader className="flex flex-row items-center p-4">
  //       <Avatar className="h-10 w-10">
  //         <AvatarImage src="/placeholder.svg" />
  //         <AvatarFallback>GL</AvatarFallback>
  //       </Avatar>
  //       <div className="ml-3">
  //         <p className="font-semibold">George Lobko</p>
  //         <p className="text-sm text-gray-500">2 hours ago</p>
  //       </div>
  //       <Button variant="ghost" size="icon" className="ml-auto">
  //         <MoreHorizontal className="h-5 w-5" />
  //       </Button>
  //     </CardHeader>
  //     <CardContent className="p-4 pt-0">
  //       <p className="mb-4">
  //         Hi everyone, today I was on the most beautiful mountain in the world 😍, I also want to
  //         say hi to
  //         <Link href="#" className="mx-1 text-purple-600">
  //           @Silena
  //         </Link>
  //         <Link href="#" className="mx-1 text-purple-600">
  //           @Olya
  //         </Link>
  //         and
  //         <Link href="#" className="mx-1 text-purple-600">
  //           @Davis
  //         </Link>
  //         !
  //       </p>
  //       <div className="grid grid-cols-3 gap-2 overflow-hidden rounded-xl">
  //         <Image
  //           src="/placeholder.svg"
  //           alt="Mountain view"
  //           width={300}
  //           height={300}
  //           className="h-48 w-full object-cover"
  //         />
  //         <Image
  //           src="/placeholder.svg"
  //           alt="Mountain view"
  //           width={300}
  //           height={300}
  //           className="h-48 w-full object-cover"
  //         />
  //         <Image
  //           src="/placeholder.svg"
  //           alt="Mountain view"
  //           width={300}
  //           height={300}
  //           className="h-48 w-full object-cover"
  //         />
  //       </div>
  //     </CardContent>
  //     <CardFooter className="flex items-center gap-4 p-4">
  //       <div className="flex items-center gap-2 text-sm text-gray-500">
  //         <ImageIcon className="h-4 w-4" />
  //         6355
  //       </div>
  //       <Button variant="ghost" size="sm" className="gap-2">
  //         <Heart className="h-4 w-4" />
  //         Like
  //       </Button>
  //       <Button variant="ghost" size="sm" className="gap-2">
  //         <MessageCircle className="h-4 w-4" />
  //         Comment
  //       </Button>
  //       <div className="ml-auto flex gap-1">
  //         <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs">
  //           ❤️
  //         </span>
  //         <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-xs">
  //           🔥
  //         </span>
  //         <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs">
  //           🚀
  //         </span>
  //       </div>
  //     </CardFooter>
  //   </Card>
  // );
};

export default Feed;
