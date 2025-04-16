'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, User, Eye, EyeOff, LogOut } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'notifications' | 'account'>(
    'profile'
  );

  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your account settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as typeof activeTab)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="profile">
                <ProfileSettings />
              </TabsContent>

              <TabsContent value="privacy">
                <PrivacySettings />
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>

              <TabsContent value="account">
                <AccountSettings />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileSettings() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      bio: 'Software developer and tech enthusiast',
      location: 'San Francisco, CA',
      website: 'https://example.com',
    },
  });

  const onSubmit = async (data: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Profile updated successfully!');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="space-y-6">
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Change Avatar
            </Button>
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register('name')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" {...register('username')} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" {...register('bio')} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...register('location')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" {...register('website')} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function PrivacySettings() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Profile Privacy</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Profile Visibility</h4>
                <p className="text-sm text-muted-foreground">Control who can see your profile</p>
              </div>
              <RadioGroup defaultValue="public">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="friends" />
                  <Label htmlFor="friends">Friends Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private">Private</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Show Online Status</h4>
                <p className="text-sm text-muted-foreground">
                  Allow others to see when you&apos;re online
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Show Activity Status</h4>
                <p className="text-sm text-muted-foreground">
                  Allow others to see your recent activity
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Content Privacy</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Post Visibility</h4>
                <p className="text-sm text-muted-foreground">Default visibility for new posts</p>
              </div>
              <RadioGroup defaultValue="public">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="post-public" />
                  <Label htmlFor="post-public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="post-friends" />
                  <Label htmlFor="post-friends">Friends Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="post-private" />
                  <Label htmlFor="post-private">Private</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Allow Tagging</h4>
                <p className="text-sm text-muted-foreground">Allow others to tag you in posts</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Allow Comments</h4>
                <p className="text-sm text-muted-foreground">
                  Allow others to comment on your posts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </motion.div>
  );
}

function NotificationSettings() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">New Messages</h4>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for new messages
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Friend Requests</h4>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for friend requests
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Post Interactions</h4>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications for likes, comments, and shares
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Newsletter</h4>
                <p className="text-sm text-muted-foreground">Receive our weekly newsletter</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Push Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">New Messages</h4>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications for new messages
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Friend Requests</h4>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications for friend requests
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Post Interactions</h4>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications for likes, comments, and shares
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </motion.div>
  );
}

function AccountSettings() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Change Password</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button>Update Password</Button>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Account Management</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Download Your Data</h4>
                <p className="text-sm text-muted-foreground">Get a copy of your data</p>
              </div>
              <Button variant="outline">Download</Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-destructive">Delete Account</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all your data
                </p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <Button variant="outline" className="flex w-full items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
