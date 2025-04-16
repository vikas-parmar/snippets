'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, Film, Music, File, ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock API call
const fetchMedia = async (type: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return mock data based on type
  switch (type) {
    case 'images':
      return mockImages;
    case 'videos':
      return mockVideos;
    case 'audio':
      return mockAudio;
    case 'files':
      return mockFiles;
    default:
      return mockImages;
  }
};

export default function MediaPage() {
  const [mediaType, setMediaType] = useState<'images' | 'videos' | 'audio' | 'files'>('images');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: media, isLoading } = useQuery({
    queryKey: ['media', mediaType],
    queryFn: () => fetchMedia(mediaType),
  });

  const filteredMedia = media?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search media..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs
            value={mediaType}
            onValueChange={(value) => setMediaType(value as typeof mediaType)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="images" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Images</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Film className="h-4 w-4" />
                <span className="hidden sm:inline">Videos</span>
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                <span className="hidden sm:inline">Audio</span>
              </TabsTrigger>
              <TabsTrigger value="files" className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <span className="hidden sm:inline">Files</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <MediaItemSkeleton key={i} type={mediaType} />)
        ) : filteredMedia?.length === 0 ? (
          <div className="col-span-full py-8 text-center">
            <p className="text-muted-foreground">No media found</p>
          </div>
        ) : (
          filteredMedia?.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MediaItem item={item} type={mediaType} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

interface MediaItem {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  size?: string;
  duration?: string;
}

function MediaItem({ item, type }: { item: MediaItem; type: string }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative">
          <Image
            width={384}
            height={192}
            src={item.thumbnail || '/placeholder.svg'}
            alt={item.title}
            className="h-48 w-full rounded-t-lg object-cover"
          />
          {type === 'videos' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50">
                <Film className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
          {type === 'audio' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50">
                <Music className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="truncate font-medium">{item.title}</h3>
          <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>{item.date}</span>
            {item.size && <span>{item.size}</span>}
            {item.duration && <span>{item.duration}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MediaItemSkeleton({ type }: { type: string }) {
  return (
    <Card>
      <CardContent className="p-0">
        <Skeleton className="h-48 w-full rounded-t-lg" />
        <div className="p-4">
          <Skeleton className="mb-2 h-4 w-full" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const mockImages: MediaItem[] = [
  {
    id: '1',
    title: 'Summer Vacation',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'June 15, 2023',
    size: '2.4 MB',
  },
  {
    id: '2',
    title: 'Family Gathering',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'July 4, 2023',
    size: '3.1 MB',
  },
  {
    id: '3',
    title: 'Mountain Hike',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'August 12, 2023',
    size: '1.8 MB',
  },
  {
    id: '4',
    title: 'Beach Sunset',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'September 3, 2023',
    size: '2.2 MB',
  },
  {
    id: '5',
    title: 'City Skyline',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'October 20, 2023',
    size: '2.7 MB',
  },
  {
    id: '6',
    title: 'Winter Wonderland',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'December 25, 2023',
    size: '1.9 MB',
  },
];

const mockVideos: MediaItem[] = [
  {
    id: '7',
    title: 'Birthday Party',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'May 10, 2023',
    duration: '3:45',
    size: '45.2 MB',
  },
  {
    id: '8',
    title: 'Concert Highlights',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'July 22, 2023',
    duration: '5:12',
    size: '62.8 MB',
  },
  {
    id: '9',
    title: 'Travel Vlog',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'August 30, 2023',
    duration: '12:34',
    size: '128.5 MB',
  },
];

const mockAudio: MediaItem[] = [
  {
    id: '10',
    title: 'Podcast Episode 1',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'April 5, 2023',
    duration: '45:22',
    size: '32.1 MB',
  },
  {
    id: '11',
    title: 'Summer Playlist',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'June 18, 2023',
    duration: '1:12:45',
    size: '58.7 MB',
  },
  {
    id: '12',
    title: 'Voice Memo',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'September 12, 2023',
    duration: '2:18',
    size: '1.5 MB',
  },
];

const mockFiles: MediaItem[] = [
  {
    id: '13',
    title: 'Project Presentation.pptx',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'March 15, 2023',
    size: '5.2 MB',
  },
  {
    id: '14',
    title: 'Annual Report.pdf',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'April 30, 2023',
    size: '8.7 MB',
  },
  {
    id: '15',
    title: 'Budget Spreadsheet.xlsx',
    thumbnail: '/placeholder.svg?height=192&width=384',
    date: 'May 22, 2023',
    size: '3.4 MB',
  },
];
