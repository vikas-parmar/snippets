'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, Send, Phone, Video, Info, Paperclip, Smile } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

// Mock API call
const fetchConversations = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return mock data
  return mockConversations;
};

const fetchMessages = async (conversationId: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return mock data
  return mockMessages.filter((message) => message.conversationId === conversationId);
};

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState<string | null>(null);

  const { data: conversations, isLoading: isLoadingConversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
  });

  const { data: messages, isLoading: isLoadingMessages } = useQuery({
    queryKey: ['messages', activeConversation],
    queryFn: () => fetchMessages(activeConversation || ''),
    enabled: !!activeConversation,
  });

  const filteredConversations = conversations?.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConversationData = conversations?.find(
    (conversation) => conversation.id === activeConversation
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden">
      {/* Conversations List */}
      <Card className="flex h-full w-full flex-col border-r md:w-80 md:rounded-r-none">
        <CardHeader className="p-4">
          <CardTitle>Messages</CardTitle>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <ScrollArea className="flex-1 p-4">
          {isLoadingConversations ? (
            Array.from({ length: 5 }).map((_, i) => <ConversationSkeleton key={i} />)
          ) : filteredConversations?.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No conversations found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredConversations?.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ConversationItem
                    conversation={conversation}
                    isActive={activeConversation === conversation.id}
                    onClick={() => setActiveConversation(conversation.id)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </Card>

      {/* Messages Area */}
      <Card className="hidden h-full flex-1 flex-col rounded-l-none md:flex">
        {!activeConversation ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <h3 className="mb-2 text-lg font-medium">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        ) : (
          <>
            <CardHeader className="border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={activeConversationData?.avatar || '/placeholder.svg'}
                      alt={activeConversationData?.name}
                    />
                    <AvatarFallback>{activeConversationData?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeConversationData?.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {activeConversationData?.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <ScrollArea className="flex-1 p-4">
              {isLoadingMessages ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <MessageSkeleton key={i} isOwn={i % 2 === 0} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {messages?.map((message) => <MessageItem key={message.id} message={message} />)}
                </div>
              )}
            </ScrollArea>

            <CardContent className="border-t p-4">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input placeholder="Type a message..." className="flex-1" />
                <Button variant="ghost" size="icon">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

function ConversationItem({
  conversation,
  isActive,
  onClick,
}: {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-md p-3 transition-colors ${
        isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={conversation.avatar || '/placeholder.svg'} alt={conversation.name} />
          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {conversation.online && (
          <span
            className={`absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ${
              isActive ? 'ring-primary' : 'ring-background'
            }`}
          ></span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="truncate font-medium">{conversation.name}</h3>
          <span className="whitespace-nowrap text-xs">{conversation.timestamp}</span>
        </div>
        <p className="truncate text-sm">{conversation.lastMessage}</p>
      </div>

      {conversation.unread > 0 && (
        <div
          className={`flex h-5 min-w-5 items-center justify-center rounded-full text-xs font-medium ${
            isActive ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'
          }`}
        >
          {conversation.unread}
        </div>
      )}
    </div>
  );
}

function ConversationSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <Skeleton className="mb-1 h-4 w-24" />
          <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}

interface Message {
  id: string;
  conversationId: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

function MessageItem({ message }: { message: Message }) {
  return (
    <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          message.isOwn ? 'bg-primary text-primary-foreground' : 'bg-secondary'
        }`}
      >
        <p>{message.content}</p>
        <p
          className={`mt-1 text-xs ${message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}
        >
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}

function MessageSkeleton({ isOwn }: { isOwn: boolean }) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[80%]">
        <Skeleton className="h-20 w-64 rounded-lg" />
      </div>
    </div>
  );
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: "Hey, how's it going?",
    timestamp: '5m',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Samantha Lee',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Did you see the latest post?',
    timestamp: '30m',
    unread: 0,
    online: true,
  },
  {
    id: '3',
    name: 'Michael Chen',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: "Let's meet up tomorrow!",
    timestamp: '2h',
    unread: 1,
    online: false,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Thanks for the help!',
    timestamp: '1d',
    unread: 0,
    online: false,
  },
  {
    id: '5',
    name: 'David Kim',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: "I'll send you the details later",
    timestamp: '2d',
    unread: 0,
    online: true,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    conversationId: '1',
    content: "Hey, how's it going?",
    timestamp: '10:30 AM',
    isOwn: false,
  },
  {
    id: '2',
    conversationId: '1',
    content: 'Pretty good! Just working on a new project. How about you?',
    timestamp: '10:32 AM',
    isOwn: true,
  },
  {
    id: '3',
    conversationId: '1',
    content:
      "I'm doing well too. Just wanted to check in. Are you coming to the event this weekend?",
    timestamp: '10:35 AM',
    isOwn: false,
  },
  {
    id: '4',
    conversationId: '1',
    content: "Yes, I'm planning to be there! Looking forward to it.",
    timestamp: '10:36 AM',
    isOwn: true,
  },
  {
    id: '5',
    conversationId: '1',
    content: 'Great! See you there then.',
    timestamp: '10:38 AM',
    isOwn: false,
  },
  {
    id: '6',
    conversationId: '2',
    content: 'Did you see the latest post?',
    timestamp: '9:45 AM',
    isOwn: false,
  },
  {
    id: '7',
    conversationId: '2',
    content: "Not yet, what's it about?",
    timestamp: '9:50 AM',
    isOwn: true,
  },
];
