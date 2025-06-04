
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFamilyAccounts } from '@/hooks/useFamilyAccounts';

interface CreateKidsAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateKidsAccountDialog = ({ open, onOpenChange }: CreateKidsAccountDialogProps) => {
  const { createKidsAccount, isCreatingKidsAccount } = useFamilyAccounts();
  const [formData, setFormData] = useState({
    childName: '',
    age: '',
    spendingLimit: '100'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createKidsAccount({
      childName: formData.childName,
      age: formData.age ? parseInt(formData.age) : undefined,
      spendingLimit: parseInt(formData.spendingLimit)
    });

    // Reset form
    setFormData({
      childName: '',
      age: '',
      spendingLimit: '100'
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Child Account</DialogTitle>
          <DialogDescription>
            Create a new account for your child to start their charity journey
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="childName">Child's Name</Label>
            <Input
              id="childName"
              value={formData.childName}
              onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
              placeholder="Enter your child's name"
              required
            />
          </div>

          <div>
            <Label htmlFor="age">Age (optional)</Label>
            <Input
              id="age"
              type="number"
              min="3"
              max="18"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Enter age"
            />
          </div>

          <div>
            <Label htmlFor="spendingLimit">Daily Spending Limit (Sadaqah Coins)</Label>
            <Input
              id="spendingLimit"
              type="number"
              min="10"
              max="1000"
              value={formData.spendingLimit}
              onChange={(e) => setFormData({ ...formData, spendingLimit: e.target.value })}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum coins your child can spend per day
            </p>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreatingKidsAccount}>
              {isCreatingKidsAccount ? 'Creating...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateKidsAccountDialog;
