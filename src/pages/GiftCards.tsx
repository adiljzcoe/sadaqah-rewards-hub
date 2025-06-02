
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Heart, Upload, Gift, Users, Building, Droplets, User, Mail, Calendar, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Icon mapping for dynamic icons
const iconMap = {
  Heart,
  Building,
  Droplets,
  Users,
  Gift,
  User,
  Mail,
  Calendar,
  Star
} as const;

type IconName = keyof typeof iconMap;

interface GiftCardProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  icon: string;
  color: string;
  min_amount: number;
  max_amount: number;
  is_active: boolean;
  sort_order: number;
}

const presetMessages = [
  {
    category: 'General',
    messages: [
      "May Allah accept this donation and bless you abundantly. 🤲",
      "In the spirit of giving, may this gift bring barakah to your life. ✨",
      "A small act of kindness that brings great reward, In sha Allah. 💫"
    ]
  },
  {
    category: 'Graduation',
    messages: [
      "Congratulations on your graduation! May Allah bless your future endeavors. 🎓",
      "As you begin this new chapter, may Allah guide your path. Congratulations! 📚",
      "Your hard work has paid off! May this gift be a source of continued blessings. 🌟"
    ]
  },
  {
    category: 'Marriage',
    messages: [
      "Barakallahu lakuma wa baraka 'alaykuma! Wishing you a blessed marriage. 💍",
      "May Allah bless your union with love, happiness, and righteousness. 💕",
      "On your special day, may this gift bring you closer to Allah's mercy. 🤲"
    ]
  },
  {
    category: 'Eid',
    messages: [
      "Eid Mubarak! May this blessed occasion bring you joy and spiritual fulfillment. 🌙",
      "Celebrating Eid with acts of charity - may Allah accept from us all. ✨",
      "Eid greetings filled with love, peace, and charitable blessings. 🕌"
    ]
  },
  {
    category: 'Special Occasions',
    messages: [
      "Marking this special moment with an act of charity in your honor. 🎉",
      "May this gift multiply your good deeds and bring you closer to Jannah. 🌸",
      "Celebrating you with a gift that gives back to those in need. 💝"
    ]
  }
];

const amounts = [25, 50, 100, 250, 500];

const GiftCards = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [causes, setCauses] = useState<GiftCardProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCause, setSelectedCause] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMessage, setSelectedMessage] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  
  // Recipient details
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    fetchGiftCardProducts();
  }, []);

  const fetchGiftCardProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('gift_card_products')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCauses(data || []);
    } catch (error) {
      console.error('Error fetching gift card products:', error);
      toast({
        title: "Error",
        description: "Failed to load gift card options. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateGiftCard = () => {
    // Here you would normally process the gift card creation
    // For now, we'll navigate to checkout with the gift card data
    const giftCardData = {
      cause: selectedCause,
      amount: Number(customAmount) || selectedAmount,
      message: customMessage || selectedMessage,
      recipientName,
      recipientEmail,
      senderName,
      deliveryDate,
      hasCustomImage: !!uploadedImage
    };
    
    console.log('Creating gift card:', giftCardData);
    navigate('/checkout', { state: { giftCard: giftCardData } });
  };

  const finalAmount = Number(customAmount) || selectedAmount;
  const selectedCauseData = causes.find(c => c.id === selectedCause);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Gift className="h-12 w-12 text-green-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-800">Digital Gift Cards</h1>
            </div>
            <p className="text-xl text-gray-600">Share the gift of giving with your loved ones</p>
            <p className="text-gray-500 mt-2">Perfect for graduations, weddings, Eid, and special occasions</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* Select Cause */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    Choose a Cause
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {causes.map((cause) => {
                      const IconComponent = iconMap[cause.icon as IconName] || Gift;
                      return (
                        <div
                          key={cause.id}
                          onClick={() => setSelectedCause(cause.id)}
                          className={`cursor-pointer rounded-lg border-2 transition-all p-4 ${
                            selectedCause === cause.id
                              ? 'border-green-500 bg-green-50 scale-105'
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <img 
                              src={cause.image_url} 
                              alt={cause.name}
                              className="w-16 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <IconComponent className="h-4 w-4 text-gray-600" />
                                <h3 className="font-semibold text-gray-800">{cause.name}</h3>
                              </div>
                              <p className="text-sm text-gray-600">{cause.description}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Min: £{(cause.min_amount / 100).toFixed(2)} - Max: £{(cause.max_amount / 100).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Select Amount */}
              <Card>
                <CardHeader>
                  <CardTitle>Gift Amount</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-5 gap-3">
                    {amounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount('');
                        }}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                          selectedAmount === amount && !customAmount
                            ? 'bg-green-600 text-white scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        £{amount}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="custom-amount">Custom Amount:</Label>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(0);
                      }}
                      className="w-32"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Personal Photo Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-blue-500" />
                    Add Personal Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="photo-upload">Upload Your Photo (Optional)</Label>
                    <div className="mt-2">
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 transition-colors"
                      >
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                        ) : (
                          <div className="text-center">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload image</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Message Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Gift Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {presetMessages.map((category) => (
                      <div key={category.category}>
                        <h4 className="font-semibold text-gray-700 mb-2">{category.category}</h4>
                        <div className="space-y-2">
                          {category.messages.map((message, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSelectedMessage(message);
                                setCustomMessage('');
                              }}
                              className={`text-left w-full p-3 rounded-lg border transition-all ${
                                selectedMessage === message && !customMessage
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-gray-200 hover:border-green-300'
                              }`}
                            >
                              <p className="text-sm">{message}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Label htmlFor="custom-message">Or write your own message:</Label>
                    <Textarea
                      id="custom-message"
                      placeholder="Write a personal message..."
                      value={customMessage}
                      onChange={(e) => {
                        setCustomMessage(e.target.value);
                        setSelectedMessage('');
                      }}
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Recipient Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-purple-500" />
                    Recipient Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="recipient-name">Recipient Name *</Label>
                      <Input
                        id="recipient-name"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Enter recipient's name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="recipient-email">Recipient Email *</Label>
                      <Input
                        id="recipient-email"
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="Enter recipient's email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sender-name">Your Name *</Label>
                      <Input
                        id="sender-name"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="delivery-date">Delivery Date (Optional)</Label>
                      <Input
                        id="delivery-date"
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Preview */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    Gift Card Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Gift Card Design */}
                  <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Gift className="h-6 w-6" />
                          <span className="font-bold">Digital Gift Card</span>
                        </div>
                        <span className="text-2xl font-bold">£{finalAmount}</span>
                      </div>
                      
                      {imagePreview && (
                        <div className="mb-4">
                          <img src={imagePreview} alt="Custom" className="w-full h-24 object-cover rounded-lg" />
                        </div>
                      )}
                      
                      {selectedCauseData && (
                        <div className="mb-4">
                          <img src={selectedCauseData.image_url} alt={selectedCauseData.name} className="w-full h-20 object-cover rounded-lg mb-2" />
                          <p className="text-sm font-semibold">{selectedCauseData.name}</p>
                        </div>
                      )}
                      
                      {(customMessage || selectedMessage) && (
                        <div className="bg-white/20 rounded-lg p-3 mb-4">
                          <p className="text-sm italic">"{customMessage || selectedMessage}"</p>
                        </div>
                      )}
                      
                      <div className="text-xs">
                        {senderName && <p>From: {senderName}</p>}
                        {recipientName && <p>To: {recipientName}</p>}
                      </div>
                    </div>
                  </div>
                  
                  {/* Summary */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Gift Amount:</span>
                      <span className="font-semibold">£{finalAmount}</span>
                    </div>
                    {selectedCauseData && (
                      <div className="flex justify-between">
                        <span>Cause:</span>
                        <span className="font-semibold">{selectedCauseData.name}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Processing Fee:</span>
                      <span className="font-semibold">Free</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>£{finalAmount}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCreateGiftCard}
                    disabled={!selectedCause || !recipientName || !recipientEmail || !senderName || finalAmount <= 0}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3"
                  >
                    Create Gift Card →
                  </Button>
                  
                  <div className="text-xs text-gray-500 text-center">
                    <p>✓ Instant delivery via email</p>
                    <p>✓ 100% of donation goes to cause</p>
                    <p>✓ Tax-deductible receipt included</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;
