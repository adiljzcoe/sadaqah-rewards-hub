
import React from 'react';
import LiveStreams from '@/components/livestream/LiveStreams';
import { Toaster } from '@/components/ui/toaster';

const LiveTV = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      <div className="container mx-auto px-4 py-8">
        <LiveStreams />
      </div>
      <Toaster />
    </div>
  );
};

export default LiveTV;
