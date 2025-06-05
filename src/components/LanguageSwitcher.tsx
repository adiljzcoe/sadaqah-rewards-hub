
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage, availableLanguages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 min-w-[120px]"
      >
        <Globe className="h-4 w-4" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
        <ChevronDown className="h-3 w-3" />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute top-full mt-2 right-0 z-50 w-72 max-h-80 overflow-y-auto">
            <CardContent className="p-2">
              <div className="grid gap-1">
                {availableLanguages.map((language) => (
                  <Button
                    key={language.code}
                    variant={currentLanguage.code === language.code ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      setLanguage(language);
                      setIsOpen(false);
                    }}
                    className={`justify-start gap-3 w-full h-auto py-3 ${
                      language.direction === 'rtl' ? 'flex-row-reverse text-right' : ''
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{language.nativeName}</span>
                      <span className="text-xs text-gray-500">{language.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
