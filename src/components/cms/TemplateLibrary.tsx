
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Star, Clock } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  components: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  features: string[];
  preview?: string;
}

const TemplateLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const templates: Template[] = [
    {
      id: 'charity-homepage',
      name: 'Charity Homepage',
      description: 'Complete homepage template for charity organizations with hero, stats, and donation widgets',
      category: 'Homepage',
      thumbnail: '/api/placeholder/400/300',
      components: ['hero', 'stats-section', 'donation-widget', 'charity-card', 'testimonials', 'contact-form'],
      difficulty: 'beginner',
      estimatedTime: '15 min',
      features: ['Mobile responsive', 'SEO optimized', 'Donation integration', 'Social sharing']
    },
    {
      id: 'emergency-campaign',
      name: 'Emergency Relief Campaign',
      description: 'Urgent campaign page with progress tracking and quick donation options',
      category: 'Campaign',
      thumbnail: '/api/placeholder/400/300',
      components: ['hero', 'campaign-progress', 'donation-widget', 'video-embed', 'social-sharing'],
      difficulty: 'beginner',
      estimatedTime: '10 min',
      features: ['Urgency indicators', 'Progress tracking', 'Social proof', 'Mobile optimized']
    },
    {
      id: 'charity-about',
      name: 'About Us Page',
      description: 'Comprehensive about page with team, mission, and impact sections',
      category: 'About',
      thumbnail: '/api/placeholder/400/300',
      components: ['hero', 'text-block', 'image-gallery', 'stats-section', 'testimonials'],
      difficulty: 'beginner',
      estimatedTime: '20 min',
      features: ['Team showcase', 'Mission statement', 'Impact metrics', 'Photo galleries']
    },
    {
      id: 'event-landing',
      name: 'Fundraising Event',
      description: 'Event landing page with registration form and event details',
      category: 'Events',
      thumbnail: '/api/placeholder/400/300',
      components: ['hero', 'event-calendar', 'contact-form', 'location-map', 'payment-methods'],
      difficulty: 'intermediate',
      estimatedTime: '25 min',
      features: ['Event registration', 'Calendar integration', 'Location maps', 'Payment processing']
    },
    {
      id: 'donor-portal',
      name: 'Donor Portal',
      description: 'Personal dashboard for donors to track their contributions and impact',
      category: 'Portal',
      thumbnail: '/api/placeholder/400/300',
      components: ['stats-section', 'donation-widget', 'campaign-progress', 'charity-card'],
      difficulty: 'advanced',
      estimatedTime: '45 min',
      features: ['Personal dashboard', 'Donation history', 'Impact tracking', 'Achievement system']
    },
    {
      id: 'volunteer-signup',
      name: 'Volunteer Registration',
      description: 'Volunteer signup page with application form and requirements',
      category: 'Volunteer',
      thumbnail: '/api/placeholder/400/300',
      components: ['hero', 'text-block', 'contact-form', 'image-gallery'],
      difficulty: 'beginner',
      estimatedTime: '15 min',
      features: ['Application forms', 'Requirements list', 'Volunteer testimonials', 'Contact info']
    },
    {
      id: 'impact-report',
      name: 'Annual Impact Report',
      description: 'Visual impact report with charts, statistics, and success stories',
      category: 'Reports',
      thumbnail: '/api/placeholder/400/300',
      components: ['hero', 'stats-section', 'text-block', 'image-gallery', 'testimonials'],
      difficulty: 'intermediate',
      estimatedTime: '35 min',
      features: ['Data visualization', 'Success stories', 'Financial transparency', 'Download options']
    },
    {
      id: 'partnership-page',
      name: 'Corporate Partnership',
      description: 'B2B focused page for corporate partnerships and sponsorships',
      category: 'Partnership',
      thumbnail: '/api/placeholder/400/300',
      components: ['hero', 'text-block', 'stats-section', 'contact-form', 'payment-methods'],
      difficulty: 'intermediate',
      estimatedTime: '30 min',
      features: ['Corporate focus', 'Partnership tiers', 'ROI metrics', 'Custom proposals']
    }
  ];

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const useTemplate = (template: Template) => {
    console.log('Using template:', template);
    // Here you would create a new page with the template's components
    alert(`Template "${template.name}" selected! This would create a new page with all the template components.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Template Library</h2>
        <p className="text-gray-600">
          Pre-built page templates to get you started quickly. Each template includes 
          multiple components and is fully customizable.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
            {category !== 'all' && (
              <Badge variant="secondary" className="ml-2">
                {templates.filter(t => t.category === category).length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Thumbnail */}
            <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="text-sm text-gray-600">{template.name}</p>
                </div>
              </div>
              <div className="absolute top-2 left-2">
                <Badge className={getDifficultyColor(template.difficulty)}>
                  {template.difficulty}
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-white">
                  <Clock className="h-3 w-3 mr-1" />
                  {template.estimatedTime}
                </Badge>
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <p className="text-sm text-gray-600">{template.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Components */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Includes {template.components.length} components:</h4>
                <div className="flex flex-wrap gap-1">
                  {template.components.slice(0, 4).map(component => (
                    <Badge key={component} variant="outline" className="text-xs">
                      {component.replace('-', ' ')}
                    </Badge>
                  ))}
                  {template.components.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.components.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Key features:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {template.features.slice(0, 3).map(feature => (
                    <li key={feature} className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => useTemplate(template)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Use Template
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No templates found</h3>
          <p className="text-gray-500">Try selecting a different category</p>
        </div>
      )}
    </div>
  );
};

export default TemplateLibrary;
