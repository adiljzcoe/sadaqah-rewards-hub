
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Coins, Users, Building2, Clock, CheckCircle } from 'lucide-react';
import { getMatchingPool, getUnmatchedPoolTotal, getMatchedPoolTotal, getRecentMatches } from '@/utils/matchingPool';

const MatchingPoolWidget = () => {
  const unmatchedTotal = getUnmatchedPoolTotal();
  const matchedTotal = getMatchedPoolTotal();
  const recentMatches = getRecentMatches(3);
  const totalPool = unmatchedTotal + matchedTotal;
  const matchedPercentage = totalPool > 0 ? (matchedTotal / totalPool) * 100 : 0;

  return (
    <Card className="game-card">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Building2 className="h-5 w-5 mr-2 text-blue-600" />
          Business Matching Pool
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pool Status */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Pool Status</span>
            <Badge className="bg-blue-600 text-white">
              Active
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="h-4 w-4 text-orange-600 mr-1" />
                <span className="text-sm text-gray-600">Awaiting Match</span>
              </div>
              <div className="text-xl font-bold text-orange-600">
                {unmatchedTotal}
              </div>
              <div className="text-xs text-gray-500">Sadaqah Coins</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-gray-600">Matched</span>
              </div>
              <div className="text-xl font-bold text-green-600">
                {matchedTotal}
              </div>
              <div className="text-xs text-gray-500">Sadaqah Coins</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Match Progress</span>
              <span>{matchedPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={matchedPercentage} className="h-2" />
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
          <h4 className="font-semibold text-amber-800 mb-2 text-sm">💡 How It Works</h4>
          <p className="text-xs text-amber-700 leading-relaxed">
            Sadaqah coins earned from your Jannah points go into this matching pool. 
            Businesses can purchase these coins for advertising, which releases the funds to charity!
          </p>
        </div>

        {/* Recent Matches */}
        {recentMatches.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Recent Business Matches
            </h4>
            <div className="space-y-2">
              {recentMatches.map((match) => (
                <div key={match.id} className="flex items-center justify-between bg-green-50 p-2 rounded border border-green-200">
                  <div className="flex items-center">
                    <Building2 className="h-3 w-3 text-green-600 mr-2" />
                    <span className="text-xs font-medium text-green-800">
                      {match.matchedBusinessName || 'Business Partner'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Coins className="h-3 w-3 text-yellow-600 mr-1" />
                    <span className="text-xs font-bold text-green-700">
                      {match.sadaqahCoinsAmount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
          <p className="text-xs text-purple-700 mb-2">
            🚀 Help grow the pool by maintaining your donation streak!
          </p>
          <Badge className="bg-purple-600 text-white text-xs">
            Next streak: +{unmatchedTotal > 0 ? '25' : '10'} to pool
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchingPoolWidget;
