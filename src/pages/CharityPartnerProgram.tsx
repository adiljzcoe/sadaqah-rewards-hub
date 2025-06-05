
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  BarChart3, 
  Users, 
  Globe, 
  Zap, 
  Shield, 
  Heart,
  ArrowRight,
  CheckCircle,
  DollarSign
} from 'lucide-react';
import Header from '@/components/Header';

const CharityPartnerProgram = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Amplify Your Reach",
      description: "Access our engaged Muslim community of 50,000+ active donors through targeted advertising campaigns"
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Reach donors who care about your cause with advanced UTM tracking and demographic targeting"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track campaign performance, conversion rates, and ROI with comprehensive dashboard analytics"
    },
    {
      icon: DollarSign,
      title: "Revenue Sharing",
      description: "Earn competitive commission rates on all donations generated through your partnership"
    },
    {
      icon: Shield,
      title: "Verified Trust",
      description: "Join our verified charity network and display trust badges that increase donor confidence"
    },
    {
      icon: Zap,
      title: "Instant Setup",
      description: "Get your custom charity landing page live within 24 hours with professional campaign management"
    }
  ];

  const features = [
    "Custom branded landing pages",
    "Multi-platform advertising (Facebook, Instagram, Google, TikTok)",
    "Advanced UTM tracking and attribution",
    "Real-time donation tracking",
    "Mobile-optimized donation experience",
    "24/7 campaign monitoring",
    "Detailed performance reports",
    "Commission-based revenue model"
  ];

  const testimonials = [
    {
      charity: "Islamic Relief",
      quote: "Our partnership doubled our online donations within the first month. The targeting is incredibly precise.",
      impact: "120% increase in donations"
    },
    {
      charity: "Human Appeal",
      quote: "The analytics dashboard gives us insights we never had before. We can optimize campaigns in real-time.",
      impact: "85% better ROI"
    },
    {
      charity: "Penny Appeal",
      quote: "The verification system has significantly increased donor trust. More people complete their donations now.",
      impact: "95% completion rate"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="bg-green-100 text-green-800 border-green-200 mb-6">
            🚀 Partner Program
          </Badge>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Amplify Your <span className="text-blue-600">Charity's Impact</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our exclusive charity partner program and reach thousands of engaged Muslim donors 
            through targeted advertising campaigns with full attribution tracking.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
              Apply to Join Program
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Watch Demo Video
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50K+</div>
              <div className="text-gray-600">Active Donors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">£2.5M+</div>
              <div className="text-gray-600">Raised Monthly</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">95%</div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">Campaign Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Partner With Us?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply & Get Verified</h3>
              <p className="text-gray-600">Submit your charity details and get verified within 24 hours</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Launch Campaigns</h3>
              <p className="text-gray-600">We create and manage targeted ad campaigns across multiple platforms</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Track & Earn</h3>
              <p className="text-gray-600">Monitor performance and earn commissions on every donation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our comprehensive platform provides all the tools and support you need 
                to maximize your charity's online fundraising potential.
              </p>
              
              <div className="grid grid-cols-1 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
              <div className="text-center">
                <Globe className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Global Reach, Local Impact
                </h3>
                <p className="text-gray-600 mb-6">
                  Connect with Muslim donors worldwide while maintaining the personal 
                  touch that makes your charity special.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">28</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">15</div>
                    <div className="text-sm text-gray-600">Languages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Success Stories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {testimonial.impact}
                  </div>
                  <div className="text-sm text-gray-500">{testimonial.charity}</div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "{testimonial.quote}"
                </blockquote>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Fundraising?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join leading charities who have already increased their donations by an average of 120% 
            through our partner program.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              Start Your Application
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
              Schedule a Demo
            </Button>
          </div>
          
          <p className="text-sm opacity-75 mt-6">
            No setup fees • Commission-based model • 24/7 support included
          </p>
        </div>
      </section>
    </div>
  );
};

export default CharityPartnerProgram;
