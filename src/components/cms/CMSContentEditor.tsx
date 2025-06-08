
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCMSContent, useUpdateCMSContent } from '@/hooks/useCMSContent';
import { Loader2, Save, Edit3 } from 'lucide-react';

interface CMSContentEditorProps {
  contentKey: string;
  title: string;
  description?: string;
  contentType?: 'text' | 'html' | 'markdown';
}

const CMSContentEditor: React.FC<CMSContentEditorProps> = ({
  contentKey,
  title,
  description,
  contentType = 'text'
}) => {
  const { data: content, isLoading } = useCMSContent(contentKey);
  const updateContent = useUpdateCMSContent();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const contentData = content as any;

  const handleEdit = () => {
    setEditValue(contentData?.content_value || '');
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!contentData?.id) return;
    
    try {
      await updateContent.mutateAsync({
        id: contentData.id,
        content_value: editValue
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update content:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue('');
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading content...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            {title}
          </CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {!isEditing && (
          <Button onClick={handleEdit} variant="outline" size="sm">
            <Edit3 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {updateContent.error && (
          <Alert variant="destructive">
            <AlertDescription>
              Failed to update content. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor={`content-${contentKey}`}>Content</Label>
          {isEditing ? (
            <div className="space-y-3">
              {contentType === 'text' ? (
                <Input
                  id={`content-${contentKey}`}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="Enter content..."
                />
              ) : (
                <Textarea
                  id={`content-${contentKey}`}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="Enter content..."
                  rows={contentType === 'html' || contentType === 'markdown' ? 8 : 4}
                />
              )}
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={updateContent.isPending}
                  size="sm"
                >
                  {updateContent.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  disabled={updateContent.isPending}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-muted rounded-md min-h-[60px]">
              {contentData?.content_value ? (
                contentType === 'html' ? (
                  <div dangerouslySetInnerHTML={{ __html: contentData.content_value }} />
                ) : (
                  <p className="whitespace-pre-wrap">{contentData.content_value}</p>
                )
              ) : (
                <p className="text-muted-foreground italic">No content set</p>
              )}
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          <p>Content Key: {contentKey}</p>
          {contentData?.updated_at && (
            <p>Last updated: {new Date(contentData.updated_at).toLocaleString()}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CMSContentEditor;
