
import React, { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  Save, 
  Plus, 
  Trash2, 
  Settings, 
  Move, 
  Type,
  Image,
  CreditCard,
  Heart,
  Users,
  BarChart3,
  Video,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

// Component type definitions
interface ComponentData {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: ComponentData[];
}

interface PageData {
  id: string;
  title: string;
  slug: string;
  components: ComponentData[];
  settings: {
    layout: string;
    theme: string;
    seo: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
}

// Draggable component item
const DraggableComponent = ({ type, icon: Icon, label }: { type: string; icon: any; label: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 bg-white border border-gray-200 rounded-lg cursor-move hover:shadow-md transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
};

// Drop zone for components
const DropZone = ({ onDrop, children, className = '' }: { 
  onDrop: (item: any) => void; 
  children: React.ReactNode;
  className?: string;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-h-[200px] transition-all ${
        isOver ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : 'border-2 border-gray-200 border-dashed'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Editable component wrapper
const EditableComponent = ({ 
  component, 
  isSelected, 
  onSelect, 
  onDelete, 
  onUpdate 
}: {
  component: ComponentData;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onUpdate: (props: Record<string, any>) => void;
}) => {
  const renderComponent = () => {
    switch (component.type) {
      case 'hero':
        return (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 text-center">
            <h1 className="text-4xl font-bold mb-4">{component.props.title || 'Hero Title'}</h1>
            <p className="text-xl mb-6">{component.props.subtitle || 'Hero subtitle'}</p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              {component.props.buttonText || 'Get Started'}
            </Button>
          </div>
        );
      case 'donation-widget':
        return (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="text-center mb-4">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <h3 className="text-xl font-bold">{component.props.title || 'Make a Donation'}</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['£25', '£50', '£100'].map((amount) => (
                <Button key={amount} variant="outline" className="h-12">
                  {amount}
                </Button>
              ))}
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Donate Now
            </Button>
          </div>
        );
      case 'charity-card':
        return (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <Image className="h-12 w-12 text-gray-400" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{component.props.title || 'Charity Name'}</h3>
              <p className="text-gray-600 text-sm mb-3">{component.props.description || 'Charity description'}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Raised: £{component.props.raised || '1,250'}</span>
                <Button size="sm">Support</Button>
              </div>
            </div>
          </div>
        );
      case 'text-block':
        return (
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">{component.props.title || 'Text Block Title'}</h2>
            <p className="text-gray-700">{component.props.content || 'Your text content goes here...'}</p>
          </div>
        );
      case 'stats-section':
        return (
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: 'Donations', value: component.props.donations || '1,234', icon: Heart },
              { label: 'Beneficiaries', value: component.props.beneficiaries || '5,678', icon: Users },
              { label: 'Countries', value: component.props.countries || '25', icon: Globe },
              { label: 'Success Rate', value: component.props.successRate || '98%', icon: BarChart3 },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        );
      case 'contact-form':
        return (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">{component.props.title || 'Contact Us'}</h3>
            <div className="space-y-4">
              <Input placeholder="Full Name" />
              <Input placeholder="Email Address" type="email" />
              <Textarea placeholder="Your Message" rows={4} />
              <Button className="w-full">Send Message</Button>
            </div>
          </div>
        );
      case 'video-embed':
        return (
          <div className="bg-gray-900 aspect-video rounded-lg flex items-center justify-center">
            <Video className="h-16 w-16 text-white" />
            <span className="text-white ml-4">Video: {component.props.title || 'Embedded Video'}</span>
          </div>
        );
      default:
        return (
          <div className="p-4 bg-gray-100 rounded border">
            Unknown component: {component.type}
          </div>
        );
    }
  };

  return (
    <div
      className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
    >
      {renderComponent()}
      {isSelected && (
        <div className="absolute top-2 right-2 flex gap-2">
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

// Properties panel
const PropertiesPanel = ({ 
  component, 
  onUpdate 
}: { 
  component: ComponentData | null; 
  onUpdate: (props: Record<string, any>) => void;
}) => {
  if (!component) {
    return (
      <div className="p-4 text-center text-gray-500">
        Select a component to edit its properties
      </div>
    );
  }

  const updateProp = (key: string, value: any) => {
    onUpdate({ ...component.props, [key]: value });
  };

  const renderProperties = () => {
    switch (component.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={component.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={component.props.subtitle || ''}
                onChange={(e) => updateProp('subtitle', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={component.props.buttonText || ''}
                onChange={(e) => updateProp('buttonText', e.target.value)}
              />
            </div>
          </div>
        );
      case 'donation-widget':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Widget Title</Label>
              <Input
                id="title"
                value={component.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="amounts">Preset Amounts (comma separated)</Label>
              <Input
                id="amounts"
                value={component.props.amounts || '25,50,100'}
                onChange={(e) => updateProp('amounts', e.target.value)}
              />
            </div>
          </div>
        );
      case 'charity-card':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Charity Name</Label>
              <Input
                id="title"
                value={component.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={component.props.description || ''}
                onChange={(e) => updateProp('description', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="raised">Amount Raised</Label>
              <Input
                id="raised"
                value={component.props.raised || ''}
                onChange={(e) => updateProp('raised', e.target.value)}
              />
            </div>
          </div>
        );
      case 'text-block':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={component.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={6}
                value={component.props.content || ''}
                onChange={(e) => updateProp('content', e.target.value)}
              />
            </div>
          </div>
        );
      default:
        return <div>No properties available for this component type.</div>;
    }
  };

  return (
    <div className="p-4">
      <h3 className="font-bold text-lg mb-4 capitalize">{component.type} Properties</h3>
      {renderProperties()}
    </div>
  );
};

// Main page builder component
const PageBuilder = () => {
  const [pageData, setPageData] = useState<PageData>({
    id: '1',
    title: 'New Page',
    slug: 'new-page',
    components: [],
    settings: {
      layout: 'default',
      theme: 'light',
      seo: {
        title: '',
        description: '',
        keywords: [],
      },
    },
  });

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const componentLibrary = [
    { type: 'hero', icon: Type, label: 'Hero Section' },
    { type: 'donation-widget', icon: Heart, label: 'Donation Widget' },
    { type: 'charity-card', icon: Users, label: 'Charity Card' },
    { type: 'text-block', icon: Type, label: 'Text Block' },
    { type: 'stats-section', icon: BarChart3, label: 'Stats Section' },
    { type: 'contact-form', icon: Mail, label: 'Contact Form' },
    { type: 'video-embed', icon: Video, label: 'Video Embed' },
  ];

  const addComponent = useCallback((item: { type: string }) => {
    const newComponent: ComponentData = {
      id: `component-${Date.now()}`,
      type: item.type,
      props: {},
    };

    setPageData(prev => ({
      ...prev,
      components: [...prev.components, newComponent],
    }));
  }, []);

  const deleteComponent = useCallback((componentId: string) => {
    setPageData(prev => ({
      ...prev,
      components: prev.components.filter(c => c.id !== componentId),
    }));
    setSelectedComponent(null);
  }, []);

  const updateComponent = useCallback((componentId: string, props: Record<string, any>) => {
    setPageData(prev => ({
      ...prev,
      components: prev.components.map(c =>
        c.id === componentId ? { ...c, props } : c
      ),
    }));
  }, []);

  const selectedComponentData = selectedComponent 
    ? pageData.components.find(c => c.id === selectedComponent) 
    : null;

  const savePage = () => {
    console.log('Saving page:', pageData);
    // Here you would save to your backend/database
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex">
        {/* Sidebar - Component Library */}
        {!previewMode && (
          <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">Component Library</h2>
            </div>
            
            <Tabs defaultValue="components" className="w-full">
              <TabsList className="grid w-full grid-cols-2 m-4">
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="components" className="p-4 space-y-3">
                {componentLibrary.map((component) => (
                  <DraggableComponent
                    key={component.type}
                    type={component.type}
                    icon={component.icon}
                    label={component.label}
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="settings" className="p-4 space-y-4">
                <div>
                  <Label htmlFor="pageTitle">Page Title</Label>
                  <Input
                    id="pageTitle"
                    value={pageData.title}
                    onChange={(e) => setPageData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="pageSlug">Page Slug</Label>
                  <Input
                    id="pageSlug"
                    value={pageData.slug}
                    onChange={(e) => setPageData(prev => ({ ...prev, slug: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={pageData.settings.seo.title}
                    onChange={(e) => setPageData(prev => ({
                      ...prev,
                      settings: {
                        ...prev.settings,
                        seo: { ...prev.settings.seo, title: e.target.value }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={pageData.settings.seo.description}
                    onChange={(e) => setPageData(prev => ({
                      ...prev,
                      settings: {
                        ...prev.settings,
                        seo: { ...prev.settings.seo, description: e.target.value }
                      }
                    }))}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <h1 className="font-bold text-xl">{pageData.title}</h1>
              <span className="text-gray-500">/{pageData.slug}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button onClick={savePage}>
                <Save className="h-4 w-4 mr-2" />
                Save Page
              </Button>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 flex">
            <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
              <div className="max-w-6xl mx-auto bg-white min-h-full shadow-lg">
                <DropZone
                  onDrop={addComponent}
                  className="p-6 space-y-6"
                >
                  {pageData.components.length === 0 ? (
                    <div className="text-center py-12">
                      <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Drag components here to start building your page</p>
                    </div>
                  ) : (
                    pageData.components.map((component) => (
                      <EditableComponent
                        key={component.id}
                        component={component}
                        isSelected={selectedComponent === component.id}
                        onSelect={() => setSelectedComponent(component.id)}
                        onDelete={() => deleteComponent(component.id)}
                        onUpdate={(props) => updateComponent(component.id, props)}
                      />
                    ))
                  )}
                </DropZone>
              </div>
            </div>

            {/* Properties Panel */}
            {!previewMode && (
              <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-bold text-lg">Properties</h2>
                </div>
                <PropertiesPanel
                  component={selectedComponentData}
                  onUpdate={(props) => selectedComponent && updateComponent(selectedComponent, props)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default PageBuilder;
