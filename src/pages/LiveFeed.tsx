
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import LiveVideo from '@/components/LiveVideo';
import { Heart, Users, Clock, MapPin, TrendingUp } from 'lucide-react';

const liveCampaigns = [
  {
    title: 'Emergency Relief for Gaza Families',
    charity: 'Islamic Relief',
    status: 'live',
    raised: '£15,650',
    target: '£20,000',
    donors: 342,
    timeLeft: '12 hours',
    location: 'Gaza, Palestine',
    urgency: 'critical'
  },
  {
    title: 'Winter Clothing Drive - Syria',
    charity: 'Human Appeal',
    status: 'live',
    raised: '£8,200',
    target: '£15,000',
    donors: 156,
    timeLeft: '3 days',
    location: 'Aleppo, Syria',
    urgency: 'high'
  },
  {
    title: 'Clean Water Project - Yemen',
    charity: 'Muslim Aid',
    status: 'ending-soon',
    raised: '£22,100',
    target: '£25,000',
    donors: 445,
    timeLeft: '6 hours',
    location: 'Sana\'a, Yemen',
    urgency: 'critical'
  }
];

const recentDonations = [
  { donor: 'Ahmad M.', amount: '£50', charity: 'Islamic Relief', time: '2 min ago' },
  { donor: 'Sarah K.', amount: '£25', charity: 'Human Appeal', time: '5 min ago' },
  { donor: 'Anonymous', amount: '£100', charity: 'Muslim Aid', time: '8 min ago' },
  { donor: 'Omar R.', amount: '£75', charity: 'Islamic Relief', time: '12 min ago' },
  { donor: 'Fatima A.', amount: '£30', charity: 'Human Appeal', time: '15 min ago' }
];

const LiveFeed = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Live Charity Feed</h1>
          <p className="text-xl text-gray-600">
            Real-time updates on urgent campaigns and donation activity
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Video Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                Live Video
              </h2>
              <LiveVideo />
            </div>

            {/* Live Campaigns */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Urgent Campaigns</h2>
              <div className="space-y-4">
                {liveCampaigns.map((campaign, index) => (
                  <Card key={index} className="border-l-4 border-l-red-500">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-semibold mr-3">{campaign.title}</h3>
                            <Badge 
                              className={`${
                                campaign.urgency === 'critical' ? 'bg-red-100 text-red-800' :
                                campaign.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {campaign.urgency}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-gray-600 text-sm mb-3">
                            <span className="font-medium">{campaign.charity}</span>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {campaign.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {campaign.timeLeft} left
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-islamic-green-700">{campaign.raised}</div>
                          <div className="text-sm text-gray-600">of {campaign.target}</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>{campaign.donors} donors</span>
                          <span>{Math.round((parseInt(campaign.raised.replace(/[£,]/g, '')) / parseInt(campaign.target.replace(/[£,]/g, ''))) * 100)}% funded</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-islamic-green-600 h-3 rounded-full transition-all duration-300" 
                            style={{ width: `${(parseInt(campaign.raised.replace(/[£,]/g, '')) / parseInt(campaign.target.replace(/[£,]/g, ''))) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-islamic-green-600 hover:bg-islamic-green-700">
                        <Heart className="h-4 w-4 mr-2" />
                        Donate Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Live Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Today's Donations</span>
                    <span className="font-semibold">£28,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Donors</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campaigns Funded</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lives Impacted</span>
                    <span className="font-semibold">15,680</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Donations */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Recent Donations
                </h3>
                <div className="space-y-3">
                  {recentDonations.map((donation, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <div className="font-medium text-sm">{donation.donor}</div>
                        <div className="text-xs text-gray-600">{donation.charity}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-islamic-green-700">{donation.amount}</div>
                        <div className="text-xs text-gray-500">{donation.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Donate */}
            <Card className="bg-islamic-green-50 border-islamic-green-200">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2 text-islamic-green-800">Quick Donate</h3>
                <p className="text-sm text-islamic-green-700 mb-4">Make an instant impact</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Button variant="outline" className="border-islamic-green-300 text-islamic-green-700">£10</Button>
                  <Button variant="outline" className="border-islamic-green-300 text-islamic-green-700">£25</Button>
                  <Button variant="outline" className="border-islamic-green-300 text-islamic-green-700">£50</Button>
                  <Button variant="outline" className="border-islamic-green-300 text-islamic-green-700">£100</Button>
                </div>
                <Button className="w-full bg-islamic-green-600 hover:bg-islamic-green-700">
                  Donate Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;
