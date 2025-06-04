
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Star, Gift, TrendingUp, Calendar } from 'lucide-react';
import { useKidsDonations } from '@/hooks/useFamilyAccounts';

interface KidsAccount {
  id: string;
  family_id: string;
  child_name: string;
  age?: number;
  sadaqah_coins: number;
  jannah_points: number;
  spending_limit_daily: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface KidsAccountCardProps {
  account: KidsAccount;
  onTopup: () => void;
}

const KidsAccountCard = ({ account, onTopup }: KidsAccountCardProps) => {
  const { donations } = useKidsDonations(account.id);
  
  const todaysDonations = donations?.filter(
    d => new Date(d.donation_date).toDateString() === new Date().toDateString()
  ) || [];
  
  const todaysSpent = todaysDonations.reduce((sum, d) => sum + d.amount_coins, 0);
  const remainingDaily = account.spending_limit_daily - todaysSpent;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{account.child_name}</CardTitle>
            {account.age && (
              <p className="text-sm text-gray-600">Age {account.age}</p>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            Active
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Balances */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Coins className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Coins</span>
            </div>
            <p className="text-lg font-bold text-yellow-900">{account.sadaqah_coins}</p>
          </div>
          
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Points</span>
            </div>
            <p className="text-lg font-bold text-purple-900">{account.jannah_points}</p>
          </div>
        </div>

        {/* Daily Spending */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">Today's Limit</span>
            <span className="text-xs text-blue-600">{todaysSpent}/{account.spending_limit_daily}</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min((todaysSpent / account.spending_limit_daily) * 100, 100)}%` 
              }}
            />
          </div>
          <p className="text-xs text-blue-700 mt-1">
            {remainingDaily} coins remaining today
          </p>
        </div>

        {/* Recent Activity */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Recent Activity</span>
          </div>
          {todaysDonations.length > 0 ? (
            <p className="text-xs text-gray-600">
              {todaysDonations.length} donation{todaysDonations.length !== 1 ? 's' : ''} today
            </p>
          ) : (
            <p className="text-xs text-gray-500">No donations today</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={onTopup}>
            <Gift className="h-4 w-4 mr-1" />
            Top Up
          </Button>
          <Button size="sm" className="flex-1">
            <Calendar className="h-4 w-4 mr-1" />
            View Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KidsAccountCard;
