
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Heart, ThumbsUp, HandClap, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface ChatMessage {
  id: string;
  stream_id: string;
  user_id: string | null;
  message: string;
  message_type: string;
  created_at: string;
  profiles?: {
    full_name: string;
  } | null;
}

interface StreamReaction {
  id: string;
  stream_id: string;
  user_id: string | null;
  reaction_type: string;
  created_at: string;
}

interface LiveChatProps {
  streamId: string;
  streamTitle: string;
}

const LiveChat: React.FC<LiveChatProps> = ({ streamId, streamTitle }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [recentReactions, setRecentReactions] = useState<StreamReaction[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const reactions = [
    { type: 'heart', icon: '❤️', color: 'text-red-500' },
    { type: 'like', icon: '👍', color: 'text-blue-500' },
    { type: 'clap', icon: '👏', color: 'text-yellow-500' },
    { type: 'pray', icon: '🤲', color: 'text-green-500' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('stream_chat_messages')
        .select(`
          *,
          profiles!inner (
            full_name
          )
        `)
        .eq('stream_id', streamId)
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Fallback: fetch messages without profile data
      try {
        const { data, error: fallbackError } = await supabase
          .from('stream_chat_messages')
          .select('*')
          .eq('stream_id', streamId)
          .order('created_at', { ascending: true })
          .limit(100);

        if (fallbackError) throw fallbackError;
        setMessages(data || []);
      } catch (fallbackErr) {
        console.error('Fallback fetch also failed:', fallbackErr);
      }
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    try {
      const { error } = await supabase
        .from('stream_chat_messages')
        .insert({
          stream_id: streamId,
          user_id: user.id,
          message: newMessage.trim(),
          message_type: 'text'
        });

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const sendReaction = async (reactionType: string) => {
    if (!user) {
      toast({
        title: "Sign in Required",
        description: "Please sign in to send reactions.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('stream_reactions')
        .insert({
          stream_id: streamId,
          user_id: user.id,
          reaction_type: reactionType
        });

      if (error) throw error;

      // Add visual feedback
      toast({
        title: "Reaction Sent! 🎉",
        description: `You sent a ${reactions.find(r => r.type === reactionType)?.icon}`,
      });
    } catch (error) {
      console.error('Error sending reaction:', error);
      toast({
        title: "Error",
        description: "Failed to send reaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatMessageText = (message: ChatMessage) => {
    if (message.message_type === 'join') {
      return `${message.profiles?.full_name || 'Someone'} joined the stream`;
    }
    if (message.message_type === 'leave') {
      return `${message.profiles?.full_name || 'Someone'} left the stream`;
    }
    return message.message;
  };

  useEffect(() => {
    fetchMessages();

    // Subscribe to real-time chat messages
    const messagesChannel = supabase
      .channel(`stream-chat-${streamId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'stream_chat_messages',
          filter: `stream_id=eq.${streamId}`
        },
        (payload) => {
          console.log('New message:', payload);
          fetchMessages(); // Refresh to get profile data
        }
      )
      .subscribe();

    // Subscribe to real-time reactions
    const reactionsChannel = supabase
      .channel(`stream-reactions-${streamId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'stream_reactions',
          filter: `stream_id=eq.${streamId}`
        },
        (payload) => {
          console.log('New reaction:', payload);
          const newReaction = payload.new as StreamReaction;
          setRecentReactions(prev => [...prev.slice(-9), newReaction]);
          
          // Remove reaction after animation
          setTimeout(() => {
            setRecentReactions(prev => prev.filter(r => r.id !== newReaction.id));
          }, 3000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(reactionsChannel);
    };
  }, [streamId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            Live Chat
          </CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            {onlineUsers} online
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{streamTitle}</p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-3 min-h-0 max-h-80 p-2 bg-gray-50 rounded-lg">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No messages yet. Be the first to say hello!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.message_type !== 'text' ? 'text-gray-500 italic text-sm' : ''
                }`}
              >
                {message.message_type === 'text' && (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                    {message.profiles?.full_name?.charAt(0).toUpperCase() || '?'}
                  </div>
                )}
                <div>
                  {message.message_type === 'text' && (
                    <div className="flex items-center">
                      <span className="font-semibold text-sm">
                        {message.profiles?.full_name || 'Anonymous'}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {formatTime(message.created_at)}
                      </span>
                    </div>
                  )}
                  <p className={`
                    ${message.message_type === 'text' ? 'text-sm' : 'text-xs text-center'}
                  `}>
                    {formatMessageText(message)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Reactions Floating Animation */}
        <div className="relative h-0">
          {recentReactions.map((reaction) => {
            const reactionDetails = reactions.find(r => r.type === reaction.reaction_type) || 
                                   { icon: '👍', color: 'text-blue-500' };
            const randomX = Math.floor(Math.random() * 80);
            
            return (
              <div
                key={reaction.id}
                className="absolute bottom-0 animate-float-up text-2xl"
                style={{ left: `${randomX}%` }}
              >
                {reactionDetails.icon}
              </div>
            );
          })}
        </div>

        {/* Reaction Buttons */}
        <div className="flex justify-center space-x-2">
          {reactions.map((reaction) => (
            <Button
              key={reaction.type}
              variant="outline"
              size="icon"
              className="rounded-full hover:bg-gray-100"
              onClick={() => sendReaction(reaction.type)}
            >
              <span className="text-xl">{reaction.icon}</span>
            </Button>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <Button 
            variant="default"
            onClick={sendMessage}
            disabled={!newMessage.trim() || !user}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {!user && (
          <p className="text-sm text-center text-amber-600">
            Please sign in to join the conversation
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveChat;
