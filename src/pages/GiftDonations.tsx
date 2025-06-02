
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Gift, Heart, Upload, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GiftDonations = () => {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [amount, setAmount] = useState(25);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const { toast } = useToast();

  const themes = [
    {
      id: 'mosque',
      name: 'Golden Mosque',
      description: 'Beautiful mosque at sunset',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=300&fit=crop',
      islamicMessage: 'May Allah bless you with peace and prosperity'
    },
    {
      id: 'stars',
      name: 'Starry Night',
      description: 'Islamic architecture under stars',
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=400&h=300&fit=crop',
      islamicMessage: 'SubhanAllah - Glory be to Allah who created the heavens'
    },
    {
      id: 'night',
      name: 'Peaceful Night',
      description: 'Serene blue starry sky',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop',
      islamicMessage: 'May this donation bring barakah to your life'
    },
    {
      id: 'flowers',
      name: 'Garden of Paradise',
      description: 'Beautiful orange flowers',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
      islamicMessage: 'May Allah reward your kindness in this life and the next'
    }
  ];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedPhoto(file);
    }
  };

  const handleSendGift = () => {
    if (!selectedTheme || !recipientName || !recipientEmail || !senderName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Gift Card Sent! 🎁",
      description: `Your £${amount} gift donation has been sent to ${recipientName}`,
    });

    // Reset form
    setSelectedTheme('');
    setRecipientName('');
    setRecipientEmail('');
    setSenderName('');
    setMessage('');
    setUploadedPhoto(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Gift className="h-8 w-8 text-green-600 mr-2" />
          <h1 className="text-4xl font-bold text-gray-900">Islamic Gift Cards</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Send meaningful digital gift cards with Islamic blessings. Perfect for special occasions, 
          celebrations, or simply spreading kindness.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Card Selection */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Choose Your Card Theme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {themes.map((theme) => (
              <Card 
                key={theme.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTheme === theme.id ? 'ring-2 ring-green-500 bg-green-50' : ''
                }`}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <div className="relative">
                  <img 
                    src={theme.image} 
                    alt={theme.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  {selectedTheme === theme.id && (
                    <Badge className="absolute top-2 right-2 bg-green-600">
                      Selected
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm">{theme.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{theme.description}</p>
                  <p className="text-xs text-green-700 mt-2 italic">
                    "{theme.islamicMessage}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Photo Upload */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Add Personal Photo (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <Label htmlFor="photo-upload" className="cursor-pointer">
                  <span className="text-sm text-gray-600">
                    Click to upload a family photo or special image
                  </span>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </Label>
                {uploadedPhoto && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {uploadedPhoto.name} uploaded
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gift Details Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                Gift Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Donation Amount */}
              <div>
                <Label htmlFor="amount">Donation Amount (£)</Label>
                <div className="flex gap-2 mt-2">
                  {[10, 25, 50, 100].map((value) => (
                    <Button
                      key={value}
                      variant={amount === value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAmount(value)}
                    >
                      £{value}
                    </Button>
                  ))}
                </div>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="mt-2"
                  min="1"
                />
              </div>

              {/* Recipient Details */}
              <div>
                <Label htmlFor="recipient-name">Recipient Name *</Label>
                <Input
                  id="recipient-name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Who is this gift for?"
                />
              </div>

              <div>
                <Label htmlFor="recipient-email">Recipient Email *</Label>
                <Input
                  id="recipient-email"
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="their.email@example.com"
                />
              </div>

              {/* Sender Details */}
              <div>
                <Label htmlFor="sender-name">Your Name *</Label>
                <Input
                  id="sender-name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="From whom?"
                />
              </div>

              {/* Personal Message */}
              <div>
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add your own heartfelt message..."
                  rows={3}
                />
              </div>

              {/* Preview */}
              {selectedTheme && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Card Preview:</p>
                  <div className="text-sm text-gray-700">
                    <p><strong>Theme:</strong> {themes.find(t => t.id === selectedTheme)?.name}</p>
                    <p><strong>Amount:</strong> £{amount}</p>
                    <p><strong>To:</strong> {recipientName || 'Recipient'}</p>
                    <p><strong>From:</strong> {senderName || 'Your Name'}</p>
                    {uploadedPhoto && <p><strong>Photo:</strong> ✓ Included</p>}
                  </div>
                </div>
              )}

              {/* Send Button */}
              <Button 
                onClick={handleSendGift}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                size="lg"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Gift Card (£{amount})
              </Button>

              <p className="text-xs text-gray-500 text-center">
                The recipient will receive a beautiful digital card with your donation made in their honor
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GiftDonations;
