
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
  Upload,
  Monitor,
  Mail,
  Bell,
  Link,
  Camera,
  DollarSign,
  Settings
} from 'lucide-react';
import Header from '@/components/Header';

const CharityPartnerProgram = () => {
  const benefits = [
    {
      icon: Upload,
      title: "Easy Campaign Setup",
      description: "Upload your media, set campaign names, and we'll create your custom subdomain with UTM tracking"
    },
    {
      icon: Globe,
      title: "Your Own Subdomain",
      description: "Get your dedicated subdomain (e.g., islamicrelief.yourjannah.com) with full branding control"
    },
    {
      icon: Target,
      title: "Professional Ad Management",
      description: "We run your ads across Facebook, Instagram, Google, and TikTok using your provided funds and creative assets"
    },
    {
      icon: Monitor,
      title: "Real-Time Campaign Tracking",
      description: "Monitor your campaign performance through UTM tracking and detailed analytics dashboards"
    },
    {
      icon: Mail,
      title: "Email Campaign Integration",
      description: "Get your own dedicated section in our email campaigns to reach our engaged subscriber base"
    },
    {
      icon: Bell,
      title: "Push Notification Features",
      description: "Your campaigns get highlighted in our push notifications and landing page promotions"
    }
  ];

  const features = [
    "Custom subdomain with your charity branding",
    "UTM tracking links for each campaign",
    "Multi-platform ad management (Facebook, Instagram, Google, TikTok)",
    "Real-time performance analytics and reporting",
    "Dedicated email campaign sections",
    "Push notification campaign features",
    "Media upload and campaign management system",
    "Budget tracking and spend monitoring",
    "Marketing dashboard for campaign messaging"
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Get Your Subdomain",
      description: "Receive your custom subdomain (e.g., yourcharity.yourjannah.com) for branded campaigns",
      icon: Globe
    },
    {
      step: 2,
      title: "Upload Funds & Media",
      description: "Provide your advertising budget and upload your campaign creative assets",
      icon: Upload
    },
    {
      step: 3,
      title: "Set Campaign Details",
      description: "Create campaign names and messaging through our marketing dashboard",
      icon: Settings
    },
    {
      step: 4,
      title: "Get UTM Links",
      description: "Receive custom tracking links pointing to your subdomain for monitoring all campaign activity",
      icon: Link
    },
    {
      step: 5,
      title: "We Run Your Ads",
      description: "Our team manages your campaigns across all platforms using your provided budget",
      icon: Target
    },
    {
      step: 6,
      title: "Track Performance",
      description: "Monitor donations, clicks, and conversions through your dedicated analytics dashboard",
      icon: BarChart3
    }
  ];

  const testimonials = [
    {
      charity: "Islamic Relief",
      quote: "Having our own subdomain islamicrelief.yourjannah.com has boosted our brand recognition. The UTM tracking is fantastic.",
      impact: "40% more efficient"
    },
    {
      charity: "Human Appeal",
      quote: "Our subdomain humanappeal.yourjannah.com gets featured in emails and push notifications. Perfect brand visibility.",
      impact: "200% reach increase"
    },
    {
      charity: "Penny Appeal",
      quote: "No hidden fees and professional ad management with our own branded subdomain - exactly what we needed.",
      impact: "3x campaign ROI"
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
            Get Your Own <span className="text-blue-600">Branded Subdomain</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Focus on your mission while we handle your digital advertising. You provide the budget and creative assets, 
            we manage professional campaigns on your custom subdomain with full transparency and tracking.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
              Get Your Subdomain
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              View Demo Subdomain
            </Button>
          </div>
          
          {/* Example Subdomains */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto mb-12">
            <h3 className="text-lg font-semibold mb-4">Example Partner Subdomains</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <code className="bg-blue-50 text-blue-700 px-3 py-2 rounded">islamicrelief.yourjannah.com</code>
              <code className="bg-green-50 text-green-700 px-3 py-2 rounded">humanappeal.yourjannah.com</code>
              <code className="bg-purple-50 text-purple-700 px-3 py-2 rounded">pennyappeal.yourjannah.com</code>
              <code className="bg-orange-50 text-orange-700 px-3 py-2 rounded">muslimaid.yourjannah.com</code>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">£500K+</div>
              <div className="text-gray-600">Ad Spend Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50K+</div>
              <div className="text-gray-600">Engaged Audience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">98%</div>
              <div className="text-gray-600">Campaign Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">0%</div>
              <div className="text-gray-600">Management Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Subdomain Campaign Management?
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
            How Your Subdomain Campaign Works
          </h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="text-sm font-bold text-blue-600 mb-2">STEP {step.step}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subdomain Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Your Brand, Your Subdomain
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Each charity partner gets their own dedicated subdomain for maximum brand visibility 
                and professional appearance across all marketing channels.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Custom Subdomain Setup</h3>
                    <p className="text-gray-600">Your charity gets its own subdomain like yourcharity.yourjannah.com for all campaigns.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Campaign Integration</h3>
                    <p className="text-gray-600">Your subdomain gets featured in our email campaigns sent to thousands of engaged donors.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Push Notification Features</h3>
                    <p className="text-gray-600">Your subdomain campaigns get prominently featured in our push notifications.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
              <div className="text-center">
                <Globe className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Professional Brand Presence
                </h3>
                <p className="text-gray-600 mb-6">
                  Your subdomain provides a professional, branded experience for donors while 
                  maintaining full tracking and analytics capabilities.
                </p>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <code className="text-lg font-mono text-blue-600">yourcharity.yourjannah.com</code>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">100%</div>
                    <div className="text-xs text-gray-600">Brand Control</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-lg font-bold text-green-600">24/7</div>
                    <div className="text-xs text-gray-600">Campaign Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need, Nothing You Don't
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Platform Features</h3>
              <div className="grid grid-cols-1 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Transparent Pricing
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Subdomain Setup & Management</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Campaign Management</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>UTM Tracking & Analytics</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Email/Push Integration</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between items-center font-semibold">
                  <span>You Pay</span>
                  <span className="text-blue-600">Only Your Ad Spend</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Partners Say
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
            Ready to Get Your Own Subdomain?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join leading charities who trust us to manage their digital campaigns on their own branded subdomains. 
            Zero management fees, maximum transparency, professional results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              Claim Your Subdomain
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
              Book a Demo Call
            </Button>
          </div>
          
          <p className="text-sm opacity-75 mt-6">
            No setup fees • No management fees • Full campaign transparency • Your own subdomain
          </p>
        </div>
      </section>
    </div>
  );
};

export default CharityPartnerProgram;
