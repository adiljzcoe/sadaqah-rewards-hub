
import React from 'react';
import { useCMSContent } from '@/hooks/useCMSContent';

interface DynamicContentProps {
  contentKey: string;
  fallback?: string;
  className?: string;
  contentType?: 'text' | 'html' | 'markdown';
}

const DynamicContent: React.FC<DynamicContentProps> = ({
  contentKey,
  fallback = '',
  className = '',
  contentType = 'text'
}) => {
  const { data: content, isLoading } = useCMSContent(contentKey);

  if (isLoading) {
    return <div className={`animate-pulse bg-gray-200 h-4 rounded ${className}`} />;
  }

  const contentValue = (content as any)?.content_value || fallback;

  if (!contentValue) {
    return null;
  }

  switch (contentType) {
    case 'html':
      return (
        <div 
          className={className}
          dangerouslySetInnerHTML={{ __html: contentValue }} 
        />
      );
    case 'markdown':
      // For now, render as plain text. In production, you'd use a markdown parser
      return <div className={className}>{contentValue}</div>;
    default:
      return <div className={className}>{contentValue}</div>;
  }
};

export default DynamicContent;
