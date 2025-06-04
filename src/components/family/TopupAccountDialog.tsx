
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useFamilyAccounts } from '@/hooks/useFamilyAccounts';
import { Coins, Star, CreditCard } from 'lucide-react';

interface KidsAccount {
  id: string;
  child_name: string;
  sadaqah_coins: number;
  jannah_points: number;
}

interface TopupAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kidsAccountId?: string;
  kidsAccounts: KidsAccount[];
}

const TopupAccountDialog = ({ open, onOpenChange, kidsAccountId, kidsAccounts }: TopupAccountDialogProps) => {
  const { topupKidsAccount, isToppping } = useFamilyAccounts();
  const [formData, setFormData] = useState({
    selectedAccountId: kidsAccountId || '',
    sadaqahCoins: '100',
    jannahPoints: '50',
    amountPaid: '10.00',
    reason: ''
  });

  React.useEffect(() => {
    if (kidsAccountId) {
      setFormData(prev => ({ ...prev, selectedAccountId: kidsAccountId }));
    }
  }, [kidsAccountId]);

  const selectedAccount = kidsAccounts.find(acc => acc.id === formData.selectedAccountId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    topupKidsAccount({
      kidsAccountId: formData.selectedAccountId,
      sadaqahCoins: parseInt(formData.sadaqahCoins),
      jannahPoints: parseInt(formData.jannahPoints),
      amountPaid: parseFloat(formData.amountPaid),
      reason: formData.reason
    });

    // Reset form
    setFormData({
      selectedAccountId: '',
      sadaqahCoins: '100',
      jannahPoints: '50',
      amountPaid: '10.00',
      reason: ''
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Top Up Account</DialogTitle>
          <DialogDescription>
            Add sadaqah coins and jannah points to your child's account
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="account">Select Child</Label>
            <Select 
              value={formData.selectedAccountId} 
              onValueChange={(value) => setFormData({ ...formData, selectedAccountId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a child's account" />
              </SelectTrigger>
              <SelectContent>
                {kidsAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.child_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedAccount && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">{selectedAccount.child_name}'s Current Balance</h4>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-yellow-600" />
                  <span>{selectedAccount.sadaqah_coins} coins</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-purple-600" />
                  <span>{selectedAccount.jannah_points} points</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sadaqahCoins">Sadaqah Coins</Label>
              <Input
                id="sadaqahCoins"
                type="number"
                min="1"
                value={formData.sadaqahCoins}
                onChange={(e) => setFormData({ ...formData, sadaqahCoins: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="jannahPoints">Jannah Points</Label>
              <Input
                id="jannahPoints"
                type="number"
                min="0"
                value={formData.jannahPoints}
                onChange={(e) => setFormData({ ...formData, jannahPoints: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="amountPaid">Amount Paid (GBP)</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="amountPaid"
                type="number"
                step="0.01"
                min="0"
                value={formData.amountPaid}
                onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
                className="pl-10"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Real money amount you're spending for this top-up
            </p>
          </div>

          <div>
            <Label htmlFor="reason">Reason (optional)</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="e.g., Weekly allowance, reward for good behavior"
              rows={2}
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isToppping || !formData.selectedAccountId}
            >
              {isToppping ? 'Processing...' : 'Top Up Account'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TopupAccountDialog;
