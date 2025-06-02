
import React from 'react';
import LiveStreams from '@/components/livestream/LiveStreams';

const LiveTV = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8">
        <LiveStreams />
      </div>
    </div>
  );
};

export default LiveTV;
