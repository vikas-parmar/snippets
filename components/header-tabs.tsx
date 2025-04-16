import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

type TabListType = {
  label: string;
  value: string;
};

const NewFeedTabs = [
  { label: 'Popular', value: 'popular' },
  { label: 'Friends', value: 'friends' },
];

const RouteTabs = [
  { label: 'News Feed', value: '/' },
  { label: 'Messages', value: '/messages' },
  { label: 'friends', value: '/friends' },
  { label: 'Media', value: '/media' },
  { label: 'Settings', value: '/settings' },
];

const HeaderTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isNewFeed = pathname === '/';

  const [tabList, setTabList] = useState<TabListType[]>(NewFeedTabs);
  const [selectedTab, setSelectedTab] = useState<string>(tabList[0].value);
  useEffect(() => {
    if (isNewFeed) {
      setTabList(NewFeedTabs);
      setSelectedTab(NewFeedTabs[0].value);
    } else {
      setTabList(RouteTabs);
      setSelectedTab(pathname);
    }
  }, [isNewFeed, pathname]);
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center bg-background/80 backdrop-blur-md">
      <Tabs
        defaultValue={tabList[0].value}
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="flex w-full justify-start gap-2 bg-transparent px-4">
          {tabList.map((tab: TabListType) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-md border-b-2 border-transparent p-2 px-3 py-1 text-sm font-medium transition-all data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:bg-transparent data-[state=active]:text-purple-600 data-[state=active]:shadow-none"
              onClick={(e) => {
                if (!isNewFeed) {
                  e.preventDefault();
                  router.push(tab.value);
                }
              }}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </header>
  );
};

export default HeaderTabs;
