
import React from 'react';
import Header from '@/components/Header';
import YouTubeScheduler from '@/components/livestream/YouTubeScheduler';
import { Toaster } from '@/components/ui/toaster';
import { useTranslation } from '@/contexts/TranslationContext';

const LiveTV = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('live_tv')}</h1>
          <p className="text-gray-600">
            {t('live_tv_description') || 'Continuous Islamic content with automatic Athan interruptions'}
          </p>
        </div>
        <YouTubeScheduler />
      </div>
      <Toaster />
    </div>
  );
};

export default LiveTV;
