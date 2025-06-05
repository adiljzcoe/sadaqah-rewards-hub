
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Gift, Users, Zap } from 'lucide-react';

interface CharityDonationToolsProps {
  charity: {
    id: string;
    name: string;
  };
}

const CharityDonationTools = ({ charity }: CharityDonationToolsProps) => {
  const donationOptions = [
    {
      icon: Heart,
      title: "One-Time Donation",
      description: "Make a direct donation to support our immediate needs",
      amounts: [10, 25, 50, 100],
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700"
    },
    {
      icon: Zap,
      title: "Monthly Giving",
      description: "Join our monthly giving circle for sustained impact",
      amounts: [15, 30, 75, 150],
      color: "bg-green-600",
      hoverColor: "hover:bg-green-700"
    },
    {
      icon: Gift,
      title: "Memorial Gifts",
      description: "Honor someone special with a meaningful donation",
      amounts: [25, 50, 100, 250],
      color: "bg-purple-600",
      hoverColor: "hover:bg-purple-700"
    }
  ];

  return (
    <section id="donate" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Support {charity.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose how you'd like to make a difference. Every contribution goes directly to our programs and beneficiaries.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {donationOptions.map((option, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 ${option.color.replace('bg-', 'bg-').replace('-600', '-100')} rounded-lg flex items-center justify-center mb-4`}>
                <option.icon className={`h-6 w-6 ${option.color.replace('bg-', 'text-')}`} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {option.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {option.description}
              </p>
              
              <div className="grid grid-cols-2 gap-2 mb-6">
                {option.amounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className="w-full"
                  >
                    £{amount}
                  </Button>
                ))}
              </div>
              
              <Button className={`w-full ${option.color} ${option.hoverColor} text-white`}>
                Donate Now
              </Button>
            </Card>
          ))}
        </div>
        
        {/* Custom Amount Section */}
        <div className="mt-12 text-center">
          <Card className="p-8 max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Custom Amount
            </h3>
            <p className="text-gray-600 mb-6">
              Enter any amount that's meaningful to you
            </p>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center border rounded-md px-3">
                <span className="text-gray-500 mr-2">£</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="flex-1 py-2 bg-transparent outline-none"
                  min="1"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Donate
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CharityDonationTools;
