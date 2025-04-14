'use client';

import { useState } from 'react';
import { Bell, Camera, Info, Lock, Save, Shield, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';
import Sidebar from '@/components/sidebar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isAutoSave, setIsAutoSave] = useState(true);

  const handleSave = () => {
    toast('Settings saved', {
      description: 'Your settings have been saved successfully.',
    });
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'account', label: 'Account', icon: Shield },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-around border-t bg-white p-2 md:hidden">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                'flex flex-col items-center rounded-md p-2 text-xs',
                activeSection === item.id
                  ? 'text-purple-600'
                  : 'text-gray-500 hover:text-purple-600'
              )}
            >
              <item.icon className="mb-1 h-5 w-5" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex">
          {/* Settings Navigation */}
          <div className="hidden w-64 border-r bg-white md:block">
            <div className="border-b p-4">
              <h2 className="text-lg font-semibold">Settings</h2>
            </div>
            <div className="py-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors',
                    activeSection === item.id
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <div className="ml-auto h-5 w-1 rounded-l-full bg-purple-600"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 pb-16 md:pb-0">
            <div className="mx-auto max-w-3xl p-4 md:p-6 lg:p-8">
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Profile Settings</h1>
                    {!isAutoSave && (
                      <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    )}
                  </div>

                  <Card className="overflow-hidden border-none shadow-md">
                    <div className="relative h-32 bg-gradient-to-r from-purple-500 to-pink-500">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2 flex items-center gap-1"
                      >
                        <Camera className="h-4 w-4" />
                        Change Cover
                      </Button>
                    </div>
                    <div className="relative px-6">
                      <Avatar className="absolute -top-12 h-24 w-24 border-4 border-white bg-white">
                        <AvatarImage src="/placeholder.svg" alt="Profile" />
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <div className="pt-14">
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute right-6 top-14 flex items-center gap-1"
                        >
                          <Camera className="h-4 w-4" />
                          Change Photo
                        </Button>
                      </div>
                    </div>
                    <CardContent className="space-y-6 p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Display Name</Label>
                          <Input
                            id="name"
                            defaultValue="Johny Depp"
                            className="border-gray-200 focus-visible:ring-purple-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            defaultValue="@djohny"
                            className="border-gray-200 focus-visible:ring-purple-500"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue="johny@example.com"
                            className="border-gray-200 focus-visible:ring-purple-500"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            placeholder="Tell us about yourself"
                            className="min-h-[120px] resize-none border-gray-200 focus-visible:ring-purple-500"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle>Social Profiles</CardTitle>
                      <CardDescription>Connect your social media accounts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="twitter">Twitter</Label>
                          <Input
                            id="twitter"
                            placeholder="@username"
                            className="border-gray-200 focus-visible:ring-purple-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="instagram">Instagram</Label>
                          <Input
                            id="instagram"
                            placeholder="@username"
                            className="border-gray-200 focus-visible:ring-purple-500"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Privacy Section */}
              {activeSection === 'privacy' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Privacy Settings</h1>
                    {!isAutoSave && (
                      <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    )}
                  </div>

                  <Card className="border-none shadow-md">
                    <CardHeader className="border-b pb-4">
                      <CardTitle>Account Privacy</CardTitle>
                      <CardDescription>Control who can see your content</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="flex flex-col space-y-1.5">
                          <h3 className="text-sm font-medium">Profile Visibility</h3>
                          <div className="flex flex-col space-y-3 rounded-lg border p-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroup defaultValue="public" className="flex flex-col space-y-3">
                                <div className="flex items-center space-x-3 rounded-md border border-transparent p-2 hover:bg-gray-50">
                                  <RadioGroupItem
                                    value="public"
                                    id="public"
                                    className="border-purple-500 text-purple-600"
                                  />
                                  <div className="flex-1">
                                    <Label htmlFor="public" className="text-base font-medium">
                                      Public
                                    </Label>
                                    <p className="text-sm text-gray-500">
                                      Anyone can see your profile and posts
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3 rounded-md border border-transparent p-2 hover:bg-gray-50">
                                  <RadioGroupItem
                                    value="friends"
                                    id="friends"
                                    className="border-purple-500 text-purple-600"
                                  />
                                  <div className="flex-1">
                                    <Label htmlFor="friends" className="text-base font-medium">
                                      Friends Only
                                    </Label>
                                    <p className="text-sm text-gray-500">
                                      Only friends can see your profile and posts
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3 rounded-md border border-transparent p-2 hover:bg-gray-50">
                                  <RadioGroupItem
                                    value="private"
                                    id="private"
                                    className="border-purple-500 text-purple-600"
                                  />
                                  <div className="flex-1">
                                    <Label htmlFor="private" className="text-base font-medium">
                                      Private
                                    </Label>
                                    <p className="text-sm text-gray-500">
                                      Only you can see your profile and posts
                                    </p>
                                  </div>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <div className="flex items-center">
                                <Label className="text-base font-medium">Direct Messages</Label>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Info className="ml-2 h-4 w-4 text-gray-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Control who can send you direct messages</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <p className="text-sm text-gray-500">
                                Choose who can send you direct messages
                              </p>
                            </div>
                            <Select defaultValue="everyone">
                              <SelectTrigger className="w-[180px] border-gray-200 focus:ring-purple-500">
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="everyone">Everyone</SelectItem>
                                <SelectItem value="friends">Friends only</SelectItem>
                                <SelectItem value="nobody">Nobody</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <Label className="text-base font-medium">Post Comments</Label>
                              <p className="text-sm text-gray-500">
                                Allow others to comment on your posts
                              </p>
                            </div>
                            <Switch className="data-[state=checked]:bg-purple-600" defaultChecked />
                          </div>

                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <Label className="text-base font-medium">Profile Visibility</Label>
                              <p className="text-sm text-gray-500">
                                Show your profile in search results
                              </p>
                            </div>
                            <Switch className="data-[state=checked]:bg-purple-600" defaultChecked />
                          </div>

                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <Label className="text-base font-medium">Activity Status</Label>
                              <p className="text-sm text-gray-500">
                                Show when you&apos;re active on the platform
                              </p>
                            </div>
                            <Switch className="data-[state=checked]:bg-purple-600" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Notification Settings</h1>
                    {!isAutoSave && (
                      <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    )}
                  </div>

                  <Card className="border-none shadow-md">
                    <CardHeader className="border-b pb-4">
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Choose how and when you want to be notified</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <Label className="text-base font-medium">Email Notifications</Label>
                              <p className="text-sm text-gray-500">Receive email notifications</p>
                            </div>
                            <Switch className="data-[state=checked]:bg-purple-600" defaultChecked />
                          </div>

                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <Label className="text-base font-medium">Push Notifications</Label>
                              <p className="text-sm text-gray-500">Receive push notifications</p>
                            </div>
                            <Switch className="data-[state=checked]:bg-purple-600" defaultChecked />
                          </div>
                        </div>

                        <div className="rounded-lg border">
                          <div className="border-b p-4">
                            <h3 className="text-base font-medium">Notification Types</h3>
                            <p className="text-sm text-gray-500">
                              Select which activities you want to be notified about
                            </p>
                          </div>
                          <div className="divide-y">
                            {[
                              { id: 'likes', label: 'Likes', desc: 'When someone likes your post' },
                              {
                                id: 'comments',
                                label: 'Comments',
                                desc: 'When someone comments on your post',
                              },
                              {
                                id: 'mentions',
                                label: 'Mentions',
                                desc: 'When someone mentions you',
                              },
                              {
                                id: 'follows',
                                label: 'New Followers',
                                desc: 'When someone follows you',
                              },
                              {
                                id: 'messages',
                                label: 'Direct Messages',
                                desc: 'When you receive a direct message',
                              },
                            ].map((item) => (
                              <div key={item.id} className="flex items-center justify-between p-4">
                                <div className="flex items-center space-x-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                    <Bell className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <Label htmlFor={item.id} className="text-base font-medium">
                                      {item.label}
                                    </Label>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                  </div>
                                </div>
                                <Switch
                                  id={item.id}
                                  className="data-[state=checked]:bg-purple-600"
                                  defaultChecked
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <Label className="text-base font-medium">Notification Summary</Label>
                            <p className="text-sm text-gray-500">
                              Get a daily summary instead of individual notifications
                            </p>
                          </div>
                          <Switch className="data-[state=checked]:bg-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Account Section */}
              {activeSection === 'account' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Account Settings</h1>
                    {!isAutoSave && (
                      <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    )}
                  </div>

                  <Card className="border-none shadow-md">
                    <CardHeader className="border-b pb-4">
                      <CardTitle>Account Preferences</CardTitle>
                      <CardDescription>Manage your account settings</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <Label className="text-base font-medium">Auto-save Settings</Label>
                            <p className="text-sm text-gray-500">
                              Save changes automatically as you make them
                            </p>
                          </div>
                          <Switch
                            checked={isAutoSave}
                            onCheckedChange={setIsAutoSave}
                            className="data-[state=checked]:bg-purple-600"
                          />
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <Label className="text-base font-medium">
                              Two-Factor Authentication
                            </Label>
                            <p className="text-sm text-gray-500">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                          >
                            Enable
                          </Button>
                        </div>

                        <div className="rounded-lg border">
                          <div className="border-b p-4">
                            <h3 className="text-base font-medium">Account Actions</h3>
                          </div>
                          <div className="space-y-4 p-4">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start border-red-100 bg-white text-red-600 hover:bg-red-50"
                                  size="lg"
                                >
                                  <Trash2 className="mr-2 h-5 w-5" />
                                  Delete Account
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                    Delete Account
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
