
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Monitor, Smartphone, Tablet, Save, Eye, Undo, Redo } from 'lucide-react';
import ComponentLibrary from './ComponentLibrary';
import TemplateLibrary from './TemplateLibrary';

interface PageBuilderProps {
  onSave?: (pageData: any) => void;
  initialData?: any;
}

const PageBuilder = ({ onSave, initialData }: PageBuilderProps) => {
  const [components, setComponents] = useState(initialData?.components || []);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const addComponent = useCallback((componentType: string, config: any) => {
    const newComponent = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      config,
      position: components.length,
    };

    const newComponents = [...components, newComponent];
    setComponents(newComponents);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newComponents);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [components, history, historyIndex]);

  const updateComponent = useCallback((id: string, newConfig: any) => {
    const newComponents = components.map(comp => 
      comp.id === id ? { ...comp, config: { ...comp.config, ...newConfig } } : comp
    );
    setComponents(newComponents);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newComponents);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [components, history, historyIndex]);

  const removeComponent = useCallback((id: string) => {
    const newComponents = components.filter(comp => comp.id !== id);
    setComponents(newComponents);
    setSelectedComponent(null);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newComponents);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [components, history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setComponents(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setComponents(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const handleSave = () => {
    const pageData = {
      components,
      updatedAt: new Date().toISOString(),
    };
    onSave?.(pageData);
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-2xl mx-auto';
      default: return 'w-full';
    }
  };

  const renderComponent = (component: any) => {
    // This would render actual components based on type
    // For now, showing placeholders
    return (
      <div
        key={component.id}
        className={`border-2 border-dashed p-4 mb-4 cursor-pointer transition-colors ${
          selectedComponent === component.id 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onClick={() => setSelectedComponent(component.id)}
      >
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline">{component.type}</Badge>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              removeComponent(component.id);
            }}
          >
            Remove
          </Button>
        </div>
        <div className="bg-white p-4 rounded border">
          <h3 className="font-semibold">{component.config.title || component.type}</h3>
          <p className="text-sm text-gray-600">{component.config.description || 'Component preview'}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      {/* Component Library */}
      <div className="col-span-3 space-y-4">
        <ComponentLibrary onAddComponent={addComponent} />
        <TemplateLibrary onLoadTemplate={(template) => setComponents(template.components)} />
      </div>

      {/* Main Canvas */}
      <div className="col-span-6 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg border">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'tablet' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('tablet')}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={undo}
              disabled={historyIndex === 0}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={redo}
              disabled={historyIndex === history.length - 1}
            >
              <Redo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className={getViewportClass()}>
            {components.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <h3 className="text-lg font-semibold mb-2">Start Building Your Page</h3>
                <p>Drag components from the library or choose a template to get started.</p>
              </div>
            ) : (
              components.map(renderComponent)
            )}
          </div>
        </div>
      </div>

      {/* Properties Panel */}
      <div className="col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Properties</CardTitle>
            <CardDescription>
              {selectedComponent ? 'Configure the selected component' : 'Select a component to edit its properties'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedComponent ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Component: {components.find(c => c.id === selectedComponent)?.type}
                </p>
                {/* Component-specific property editors would go here */}
                <div className="text-xs text-gray-500">
                  Property editor coming soon...
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                No component selected
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PageBuilder;
