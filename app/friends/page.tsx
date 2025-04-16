'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, UserPlus, UserCheck, UserX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock API call
const fetchFriends = async (tab: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return mock data based on tab
  switch (tab) {
    case 'all':
      return mockFriends;
    case 'requests':
      return mockFriendRequests;
    case 'suggestions':
      return mockSuggestions;
    default:
      return mockFriends;
  }
};

export default function FriendsPage() {
  const [tab, setTab] = useState<'all' | 'requests' | 'suggestions'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: friends, isLoading } = useQuery({
    queryKey: ['friends', tab],
    queryFn: () => fetchFriends(tab),
  });

  const filteredFriends = friends?.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Friends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search friends..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as typeof tab)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Friends</TabsTrigger>
              <TabsTrigger value="requests">Friend Requests</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <FriendCardSkeleton key={i} />)
        ) : filteredFriends?.length === 0 ? (
          <div className="col-span-full py-8 text-center">
            <p className="text-muted-foreground">No friends found</p>
          </div>
        ) : (
          filteredFriends?.map((friend) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FriendCard friend={friend} type={tab} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  mutualFriends?: number;
  status?: string;
}

function FriendCard({ friend, type }: { friend: Friend; type: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={friend.avatar || '/placeholder.svg'} alt={friend.name} />
            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="font-medium">{friend.name}</h3>
            {friend.mutualFriends && (
              <p className="text-xs text-muted-foreground">{friend.mutualFriends} mutual friends</p>
            )}
            {friend.status && <p className="text-xs text-muted-foreground">{friend.status}</p>}
          </div>

          {type === 'all' && (
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          )}

          {type === 'requests' && (
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <UserCheck className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <UserX className="h-4 w-4" />
              </Button>
            </div>
          )}

          {type === 'suggestions' && (
            <Button variant="outline" size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Friend
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function FriendCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="mb-1 h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: '/placeholder.svg?height=48&width=48',
    mutualFriends: 12,
  },
  {
    id: '2',
    name: 'Samantha Lee',
    avatar: '/placeholder.svg?height=48&width=48',
    mutualFriends: 8,
  },
  {
    id: '3',
    name: 'Michael Chen',
    avatar: '/placeholder.svg?height=48&width=48',
    mutualFriends: 5,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: '/placeholder.svg?height=48&width=48',
    mutualFriends: 15,
  },
  {
    id: '5',
    name: 'David Kim',
    avatar: '/placeholder.svg?height=48&width=48',
    mutualFriends: 3,
  },
  {
    id: '6',
    name: 'Olivia Martinez',
    avatar: '/placeholder.svg?height=48&width=48',
    mutualFriends: 7,
  },
];

const mockFriendRequests: Friend[] = [
  {
    id: '7',
    name: 'James Taylor',
    avatar: '/placeholder.svg?height=48&width=48',
    mutualFriends: 4,
    status: 'Sent you a friend request',
  },
  {
    id: '8',
    name: 'Sophia Garcia',
    avatar: '/placeholder.svg?height=48&width=48',
    mutualFriends: 2,
    status: 'Sent you a friend request',
  },
  {
    id: '9',
    name: 'Daniel Brown',
    avatar: '/placeholder.svg?height=48&width=48',
    mutualFriends: 6,
    status: 'Sent you a friend request',
  },
];

const mockSuggestions: Friend[] = [
  {
    id: '10',
    name: 'Isabella Lopez',
    avatar: '/placeholder.svg?height=48&width=48',
    mutualFriends: 9,
  },
  {
    id: '11',
    name: 'Ethan Wright',
    avatar: '/placeholder.svg?height=48&width=48',
    mutualFriends: 3,
  },
  {
    id: '12',
    name: 'Ava Thompson',
    avatar: '/placeholder.svg?height=48&width=48',
    mutualFriends: 7,
  },
  {
    id: '13',
    name: 'Noah Clark',
    avatar: '/placeholder.svg?height=48&width=48',
    mutualFriends: 5,
  },
];
