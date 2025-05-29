
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Star, Trophy, Users, Shield, Zap, Award, Crown } from 'lucide-react';
import Header from '@/components/Header';

const About = () => {
  const teamMembers = [
    { name: "Ahmed Hassan", role: "Founder & CEO", image: "/placeholder.svg" },
    { name: "Sarah Johnson", role: "Head of Partnerships", image: "/placeholder.svg" },
    { name: "Mohammed Ali", role: "Tech Lead", image: "/placeholder.svg" },
    { name: "Fatima Khan", role: "Community Manager", image: "/placeholder.svg" },
  ];

  const features = [
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "Jannah Points System",
      description: "Earn spiritual rewards for every donation you make, tracking your journey to divine blessings."
    },
    {
      icon: <Trophy className="h-8 w-8 text-blue-500" />,
      title: "Community Leaderboards",
      description: "Compete with your city, mosque, and community to see who can make the biggest impact."
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Live Impact Tracking",
      description: "Watch your donations make a real difference with live updates from the field."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "100% Transparent",
      description: "Every penny is tracked and verified. See exactly where your money goes."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Community Driven",
      description: "Join thousands of donors making a collective impact on global humanitarian causes."
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: "Instant Rewards",
      description: "Get immediate feedback and rewards for your charitable contributions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            About Your Jannah
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            We're revolutionizing charitable giving by combining the spiritual reward of Sadaqah with modern 
            gamification, making charity <span className="vibrant-text-emerald font-semibold">engaging, rewarding, and impactful</span>.
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <Badge className="vibrant-gradient text-white px-6 py-3 text-lg font-medium shadow-lg">
              🌟 10,000+ Active Donors
            </Badge>
            <Badge className="accent-gradient text-white px-6 py-3 text-lg font-medium shadow-lg">
              💝 £2M+ Donated
            </Badge>
            <Badge className="purple-gradient text-white px-6 py-3 text-lg font-medium shadow-lg">
              🏆 50+ Partner Charities
            </Badge>
          </div>
        </div>

        {/* Our Mission */}
        <Card className="p-8 mb-16 hover-lift">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              To make charitable giving as engaging and rewarding as possible while maintaining the sacred 
              nature of Sadaqah. We believe that when giving feels great, people give more, and when people 
              give more, the world becomes a better place.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="vibrant-gradient w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg">
                🎯
              </div>
              <h3 className="font-bold text-xl mb-2">Engage</h3>
              <p className="text-gray-600">Make charity fun and engaging through gamification and community features.</p>
            </div>
            <div className="text-center">
              <div className="accent-gradient w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg">
                🏆
              </div>
              <h3 className="font-bold text-xl mb-2">Reward</h3>
              <p className="text-gray-600">Provide meaningful rewards that honor the spiritual aspect of giving.</p>
            </div>
            <div className="text-center">
              <div className="purple-gradient w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg">
                💝
              </div>
              <h3 className="font-bold text-xl mb-2">Impact</h3>
              <p className="text-gray-600">Maximize the positive impact on communities around the world.</p>
            </div>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Makes Us Special
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover-lift">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="p-8 mb-16 hover-lift">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="vibrant-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Choose a Cause</h3>
              <p className="text-gray-600">Browse verified charity campaigns and select one that resonates with you.</p>
            </div>
            <div className="text-center">
              <div className="accent-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Make a Donation</h3>
              <p className="text-gray-600">Donate any amount securely through our trusted payment system.</p>
            </div>
            <div className="text-center">
              <div className="purple-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Earn Rewards</h3>
              <p className="text-gray-600">Instantly receive Jannah Points and Sadaqah Coins for your generosity.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                4
              </div>
              <h3 className="font-bold text-lg mb-2">See Impact</h3>
              <p className="text-gray-600">Track your impact and compete with your community on leaderboards.</p>
            </div>
          </div>
        </Card>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 text-center hover-lift">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-bold text-lg text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="p-8 text-center vibrant-gradient text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of donors who are making the world a better place while earning spiritual rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-3">
              <Heart className="h-5 w-5 mr-2" />
              Start Donating
            </Button>
            <Button className="bg-white/20 border-2 border-white text-white hover:bg-white/30 font-bold px-8 py-3">
              <Crown className="h-5 w-5 mr-2" />
              Become VIP Member
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
