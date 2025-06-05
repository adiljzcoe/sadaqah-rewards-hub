
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

interface OriginalContentViewerProps {
  originalText: string;
  originalLanguage: string;
  translatedText?: string;
  className?: string;
}

const OriginalContentViewer: React.FC<OriginalContentViewerProps> = ({
  originalText,
  originalLanguage,
  translatedText,
  className = ""
}) => {
  const { availableLanguages, currentLanguage, translate } = useTranslation();
  const [showOriginal, setShowOriginal] = useState(false);
  
  const originalLang = availableLanguages.find(lang => lang.code === originalLanguage);
  const isCurrentLanguage = currentLanguage.code === originalLanguage;

  if (isCurrentLanguage || !originalLang) {
    return (
      <div className={`${className} ${originalLang?.direction === 'rtl' ? 'text-right' : 'text-left'}`}>
        <p className="leading-relaxed">{originalText}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Translated content */}
      <div className={currentLanguage.direction === 'rtl' ? 'text-right' : 'text-left'}>
        <p className="leading-relaxed mb-3">
          {translatedText || originalText}
        </p>
        
        {/* Translation indicator and original viewer */}
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs flex items-center gap-1">
            <span>{originalLang.flag}</span>
            <span>{translate('translated_from')} {originalLang.nativeName}</span>
          </Badge>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowOriginal(!showOriginal)}
            className="text-xs h-6 px-2"
          >
            {showOriginal ? (
              <>
                <EyeOff className="h-3 w-3 mr-1" />
                Hide original
              </>
            ) : (
              <>
                <Eye className="h-3 w-3 mr-1" />
                {translate('view_original')}
              </>
            )}
          </Button>
        </div>

        {/* Original content overlay */}
        {showOriginal && (
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{originalLang.flag}</span>
                <Badge variant="outline" className="text-xs">
                  Original in {originalLang.nativeName}
                </Badge>
              </div>
              <div 
                className={`${originalLang.direction === 'rtl' ? 'text-right' : 'text-left'}`}
                dir={originalLang.direction}
              >
                <p className="leading-relaxed font-medium">
                  {originalText}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OriginalContentViewer;
