
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Type, 
  Image, 
  Heart, 
  Users, 
  BarChart3, 
  Video, 
  Mail, 
  MapPin, 
  Calendar,
  CreditCard,
  Star,
  Globe,
  Phone,
  Target,
  Zap,
  Gift
} from 'lucide-react';

interface ComponentInfo {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  preview: string;
  props: Array<{
    name: string;
    type: string;
    required: boolean;
    default?: any;
  }>;
}

const ComponentLibrary = () => {
  const components: ComponentInfo[] = [
    {
      id: 'hero',
      name: 'Hero Section',
      description: 'Large banner section with title, subtitle, and call-to-action',
      icon: Type,
      category: 'Layout',
      preview: 'Full-width hero with background image or gradient',
      props: [
        { name: 'title', type: 'string', required: true },
        { name: 'subtitle', type: 'string', required: false },
        { name: 'buttonText', type: 'string', required: false, default: 'Get Started' },
        { name: 'backgroundImage', type: 'image', required: false },
        { name: 'backgroundColor', type: 'color', required: false, default: '#3B82F6' }
      ]
    },
    {
      id: 'donation-widget',
      name: 'Donation Widget',
      description: 'Interactive donation form with preset amounts',
      icon: Heart,
      category: 'Charity',
      preview: 'Card with donation amounts and payment form',
      props: [
        { name: 'title', type: 'string', required: true, default: 'Make a Donation' },
        { name: 'amounts', type: 'array', required: false, default: ['25', '50', '100'] },
        { name: 'currency', type: 'string', required: false, default: 'GBP' },
        { name: 'charityId', type: 'string', required: false }
      ]
    },
    {
      id: 'charity-card',
      name: 'Charity Card',
      description: 'Display charity information with image and stats',
      icon: Users,
      category: 'Charity',
      preview: 'Card showing charity name, description, and progress',
      props: [
        { name: 'title', type: 'string', required: true },
        { name: 'description', type: 'text', required: true },
        { name: 'image', type: 'image', required: false },
        { name: 'raised', type: 'number', required: false, default: 0 },
        { name: 'target', type: 'number', required: false }
      ]
    },
    {
      id: 'stats-section',
      name: 'Statistics Section',
      description: 'Display key metrics and numbers',
      icon: BarChart3,
      category: 'Data',
      preview: 'Grid of statistics with icons and values',
      props: [
        { name: 'donations', type: 'string', required: false, default: '1,234' },
        { name: 'beneficiaries', type: 'string', required: false, default: '5,678' },
        { name: 'countries', type: 'string', required: false, default: '25' },
        { name: 'successRate', type: 'string', required: false, default: '98%' }
      ]
    },
    {
      id: 'text-block',
      name: 'Text Block',
      description: 'Rich text content with formatting options',
      icon: Type,
      category: 'Content',
      preview: 'Formatted text with headings and paragraphs',
      props: [
        { name: 'title', type: 'string', required: false },
        { name: 'content', type: 'richtext', required: true },
        { name: 'alignment', type: 'select', required: false, default: 'left' }
      ]
    },
    {
      id: 'image-gallery',
      name: 'Image Gallery',
      description: 'Responsive image grid with lightbox',
      icon: Image,
      category: 'Media',
      preview: 'Grid of images with hover effects',
      props: [
        { name: 'images', type: 'array', required: true },
        { name: 'columns', type: 'number', required: false, default: 3 },
        { name: 'showCaptions', type: 'boolean', required: false, default: true }
      ]
    },
    {
      id: 'video-embed',
      name: 'Video Embed',
      description: 'Responsive video player for YouTube, Vimeo, etc.',
      icon: Video,
      category: 'Media',
      preview: 'Embedded video player with controls',
      props: [
        { name: 'url', type: 'string', required: true },
        { name: 'title', type: 'string', required: false },
        { name: 'autoplay', type: 'boolean', required: false, default: false }
      ]
    },
    {
      id: 'contact-form',
      name: 'Contact Form',
      description: 'Form for user inquiries and feedback',
      icon: Mail,
      category: 'Forms',
      preview: 'Form with name, email, and message fields',
      props: [
        { name: 'title', type: 'string', required: false, default: 'Contact Us' },
        { name: 'fields', type: 'array', required: false },
        { name: 'submitText', type: 'string', required: false, default: 'Send Message' }
      ]
    },
    {
      id: 'testimonials',
      name: 'Testimonials',
      description: 'Customer testimonials carousel',
      icon: Star,
      category: 'Social',
      preview: 'Rotating testimonials with photos and quotes',
      props: [
        { name: 'testimonials', type: 'array', required: true },
        { name: 'autoplay', type: 'boolean', required: false, default: true },
        { name: 'showRatings', type: 'boolean', required: false, default: true }
      ]
    },
    {
      id: 'campaign-progress',
      name: 'Campaign Progress',
      description: 'Visual progress bar for fundraising campaigns',
      icon: Target,
      category: 'Charity',
      preview: 'Progress bar with current and target amounts',
      props: [
        { name: 'current', type: 'number', required: true },
        { name: 'target', type: 'number', required: true },
        { name: 'title', type: 'string', required: false },
        { name: 'showPercentage', type: 'boolean', required: false, default: true }
      ]
    },
    {
      id: 'event-calendar',
      name: 'Event Calendar',
      description: 'Calendar view of upcoming events',
      icon: Calendar,
      category: 'Events',
      preview: 'Interactive calendar with event markers',
      props: [
        { name: 'events', type: 'array', required: true },
        { name: 'view', type: 'select', required: false, default: 'month' },
        { name: 'showTime', type: 'boolean', required: false, default: true }
      ]
    },
    {
      id: 'newsletter-signup',
      name: 'Newsletter Signup',
      description: 'Email subscription form',
      icon: Mail,
      category: 'Forms',
      preview: 'Simple email input with subscribe button',
      props: [
        { name: 'title', type: 'string', required: false, default: 'Stay Updated' },
        { name: 'description', type: 'string', required: false },
        { name: 'buttonText', type: 'string', required: false, default: 'Subscribe' }
      ]
    },
    {
      id: 'social-sharing',
      name: 'Social Sharing',
      description: 'Social media sharing buttons',
      icon: Globe,
      category: 'Social',
      preview: 'Row of social media icons',
      props: [
        { name: 'platforms', type: 'array', required: false, default: ['facebook', 'twitter', 'linkedin'] },
        { name: 'url', type: 'string', required: false },
        { name: 'title', type: 'string', required: false }
      ]
    },
    {
      id: 'payment-methods',
      name: 'Payment Methods',
      description: 'Display accepted payment options',
      icon: CreditCard,
      category: 'Commerce',
      preview: 'Grid of payment method logos',
      props: [
        { name: 'methods', type: 'array', required: false, default: ['visa', 'mastercard', 'paypal'] },
        { name: 'title', type: 'string', required: false, default: 'We Accept' }
      ]
    },
    {
      id: 'location-map',
      name: 'Location Map',
      description: 'Interactive map with location markers',
      icon: MapPin,
      category: 'Location',
      preview: 'Embedded map with custom markers',
      props: [
        { name: 'latitude', type: 'number', required: true },
        { name: 'longitude', type: 'number', required: true },
        { name: 'zoom', type: 'number', required: false, default: 15 },
        { name: 'showControls', type: 'boolean', required: false, default: true }
      ]
    }
  ];

  const categories = Array.from(new Set(components.map(c => c.category)));

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Layout': return 'bg-blue-100 text-blue-800';
      case 'Charity': return 'bg-green-100 text-green-800';
      case 'Content': return 'bg-purple-100 text-purple-800';
      case 'Media': return 'bg-orange-100 text-orange-800';
      case 'Forms': return 'bg-yellow-100 text-yellow-800';
      case 'Social': return 'bg-pink-100 text-pink-800';
      case 'Data': return 'bg-indigo-100 text-indigo-800';
      case 'Events': return 'bg-red-100 text-red-800';
      case 'Commerce': return 'bg-emerald-100 text-emerald-800';
      case 'Location': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Component Library</h2>
        <p className="text-gray-600">
          Reusable components for building your charity platform pages. 
          Drag and drop these onto your page canvas.
        </p>
      </div>

      {categories.map(category => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Badge className={getTypeColor(category)}>{category}</Badge>
            <span className="text-gray-500">
              ({components.filter(c => c.category === category).length} components)
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {components
              .filter(component => component.category === category)
              .map(component => {
                const IconComponent = component.icon;
                
                return (
                  <Card key={component.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{component.name}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">{component.description}</p>
                      <p className="text-xs text-gray-500 mb-3 italic">{component.preview}</p>
                      
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-gray-700">Key Properties:</h4>
                        <div className="flex flex-wrap gap-1">
                          {component.props.slice(0, 3).map(prop => (
                            <Badge 
                              key={prop.name} 
                              variant="outline" 
                              className="text-xs"
                            >
                              {prop.name}
                              {prop.required && <span className="text-red-500 ml-1">*</span>}
                            </Badge>
                          ))}
                          {component.props.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{component.props.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComponentLibrary;
