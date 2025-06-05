
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus, Youtube, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface YouTubeChannel {
  id: string;
  channel_name: string;
  channel_id: string;
  channel_url: string;
  is_active: boolean;
  priority: number;
}

const YouTubeChannelManager = () => {
  const [channels, setChannels] = useState<YouTubeChannel[]>([
    {
      id: '1',
      channel_name: 'Islamic Lectures',
      channel_id: 'UC1234567890',
      channel_url: 'https://www.youtube.com/@islamiclectures',
      is_active: true,
      priority: 1
    },
    {
      id: '2',
      channel_name: 'Quran Recitation',
      channel_id: 'UC0987654321',
      channel_url: 'https://www.youtube.com/@quranrecitation',
      is_active: true,
      priority: 2
    }
  ]);
  
  const [newChannel, setNewChannel] = useState({
    channel_name: '',
    channel_url: '',
    priority: 1
  });
  
  const { toast } = useToast();

  const extractChannelId = (url: string) => {
    // Extract channel ID from various YouTube URL formats
    const patterns = [
      /youtube\.com\/channel\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/c\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/@([a-zA-Z0-9_-]+)/,
      /youtube\.com\/user\/([a-zA-Z0-9_-]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return '';
  };

  const addChannel = () => {
    if (!newChannel.channel_name || !newChannel.channel_url) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const channelId = extractChannelId(newChannel.channel_url);
    if (!channelId) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube channel URL.",
        variant: "destructive"
      });
      return;
    }

    const channel: YouTubeChannel = {
      id: Date.now().toString(),
      channel_name: newChannel.channel_name,
      channel_id: channelId,
      channel_url: newChannel.channel_url,
      is_active: true,
      priority: newChannel.priority
    };

    setChannels([...channels, channel]);
    setNewChannel({ channel_name: '', channel_url: '', priority: 1 });
    
    toast({
      title: "Channel Added",
      description: `${channel.channel_name} has been added to the scheduler.`
    });
  };

  const removeChannel = (id: string) => {
    setChannels(channels.filter(c => c.id !== id));
    toast({
      title: "Channel Removed",
      description: "Channel has been removed from the scheduler."
    });
  };

  const toggleChannelStatus = (id: string) => {
    setChannels(channels.map(c => 
      c.id === id ? { ...c, is_active: !c.is_active } : c
    ));
  };

  const updatePriority = (id: string, priority: number) => {
    setChannels(channels.map(c => 
      c.id === id ? { ...c, priority } : c
    ));
  };

  return (
    <div className="space-y-6">
      {/* Add New Channel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add YouTube Channel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="channel_name">Channel Name</Label>
              <Input
                id="channel_name"
                placeholder="e.g., Islamic Lectures"
                value={newChannel.channel_name}
                onChange={(e) => setNewChannel({ ...newChannel, channel_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="channel_url">Channel URL</Label>
              <Input
                id="channel_url"
                placeholder="https://www.youtube.com/@channelname"
                value={newChannel.channel_url}
                onChange={(e) => setNewChannel({ ...newChannel, channel_url: e.target.value })}
              />
            </div>
          </div>
          <div className="w-32">
            <Label htmlFor="priority">Priority</Label>
            <Input
              id="priority"
              type="number"
              min="1"
              value={newChannel.priority}
              onChange={(e) => setNewChannel({ ...newChannel, priority: parseInt(e.target.value) })}
            />
          </div>
          <Button onClick={addChannel} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Channel
          </Button>
        </CardContent>
      </Card>

      {/* Channel List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="h-5 w-5" />
            Manage Channels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {channels.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No channels added yet.</p>
            ) : (
              channels.map((channel) => (
                <div key={channel.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{channel.channel_name}</h3>
                      <Badge variant={channel.is_active ? "default" : "secondary"}>
                        {channel.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      URL: {channel.channel_url}
                    </p>
                    <p className="text-sm text-gray-600">
                      Priority: {channel.priority}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`priority-${channel.id}`} className="text-sm">Priority:</Label>
                      <Input
                        id={`priority-${channel.id}`}
                        type="number"
                        min="1"
                        value={channel.priority}
                        onChange={(e) => updatePriority(channel.id, parseInt(e.target.value))}
                        className="w-20"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`active-${channel.id}`} className="text-sm">Active:</Label>
                      <Switch
                        id={`active-${channel.id}`}
                        checked={channel.is_active}
                        onCheckedChange={() => toggleChannelStatus(channel.id)}
                      />
                    </div>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeChannel(channel.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Athan Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Athan Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Athan will automatically interrupt videos at prayer times and resume after completion.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Fajr', time: '05:30' },
                { name: 'Dhuhr', time: '12:15' },
                { name: 'Asr', time: '15:30' },
                { name: 'Maghrib', time: '18:45' },
                { name: 'Isha', time: '20:00' }
              ].map((prayer) => (
                <div key={prayer.name} className="p-3 border rounded-lg">
                  <h4 className="font-semibold">{prayer.name}</h4>
                  <p className="text-sm text-gray-600">{prayer.time}</p>
                  <Badge variant="outline" className="mt-1">5 min duration</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeChannelManager;
