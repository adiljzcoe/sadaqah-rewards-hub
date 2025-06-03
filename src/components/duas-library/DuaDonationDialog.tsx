
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Heart, Gift, User } from 'lucide-react';

interface DuaDonationDialogProps {
  dua: {
    id: string;
    title: string;
    arabic_text: string;
    translation: string;
    recommended_donation_amount: number;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DuaDonationDialog = ({ dua, open, onOpenChange }: DuaDonationDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    message: '',
    onBehalfOf: '',
    isAnonymous: false
  });

  React.useEffect(() => {
    if (dua && open) {
      setFormData({
        amount: (dua.recommended_donation_amount / 100).toString(),
        donorName: '',
        message: '',
        onBehalfOf: '',
        isAnonymous: false
      });
    }
  }, [dua, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dua) return;

    setIsSubmitting(true);
    
    try {
      const amountInPence = Math.round(parseFloat(formData.amount) * 100);
      
      if (amountInPence < 50) {
        throw new Error('Minimum donation amount is £0.50');
      }

      const donationData = {
        dua_id: dua.id,
        donor_user_id: user?.id || null,
        donor_name: formData.isAnonymous ? null : (formData.donorName || 'Anonymous'),
        amount: amountInPence,
        message: formData.message || null,
        on_behalf_of: formData.onBehalfOf || null,
        is_anonymous: formData.isAnonymous,
        jannah_points_earned: Math.floor(amountInPence / 10), // 1 point per 10p
        sadaqah_coins_earned: Math.floor(amountInPence / 100) // 1 coin per £1
      };

      const { error } = await supabase
        .from('dua_donations')
        .insert(donationData);

      if (error) throw error;

      // Update user's points and coins if authenticated
      if (user?.id) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            jannah_points: supabase.raw(`jannah_points + ${donationData.jannah_points_earned}`),
            sadaqah_coins: supabase.raw(`sadaqah_coins + ${donationData.sadaqah_coins_earned}`)
          })
          .eq('id', user.id);

        if (profileError) {
          console.error('Error updating profile:', profileError);
        }
      }

      toast({
        title: "Donation Successful! 🤲",
        description: `Your donation of £${formData.amount} for "${dua.title}" has been recorded. May Allah accept your charity.`,
      });

      onOpenChange(false);
      
      // Reset form
      setFormData({
        amount: '',
        donorName: '',
        message: '',
        onBehalfOf: '',
        isAnonymous: false
      });

    } catch (error: any) {
      console.error('Donation error:', error);
      toast({
        title: "Donation Failed",
        description: error.message || 'Something went wrong. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!dua) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-600" />
            Donate for: {dua.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dua Preview */}
          <Card>
            <CardContent className="p-4">
              <p className="text-right text-lg leading-relaxed mb-3" dir="rtl">
                {dua.arabic_text.length > 200 
                  ? `${dua.arabic_text.substring(0, 200)}...` 
                  : dua.arabic_text
                }
              </p>
              <p className="text-gray-800">
                {dua.translation.length > 150 
                  ? `${dua.translation.substring(0, 150)}...` 
                  : dua.translation
                }
              </p>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Donation Amount */}
            <div>
              <Label htmlFor="amount">Donation Amount (£)</Label>
              <Input
                id="amount"
                type="number"
                step="0.50"
                min="0.50"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="5.00"
                required
              />
              <p className="text-sm text-gray-600 mt-1">
                Minimum donation: £0.50
              </p>
            </div>

            {/* Donor Name */}
            <div>
              <Label htmlFor="donorName">Your Name (optional)</Label>
              <Input
                id="donorName"
                value={formData.donorName}
                onChange={(e) => setFormData({...formData, donorName: e.target.value})}
                placeholder="Enter your name"
                disabled={formData.isAnonymous}
              />
            </div>

            {/* On Behalf Of */}
            <div>
              <Label htmlFor="onBehalfOf">On Behalf Of (optional)</Label>
              <Input
                id="onBehalfOf"
                value={formData.onBehalfOf}
                onChange={(e) => setFormData({...formData, onBehalfOf: e.target.value})}
                placeholder="e.g., 'My mother', 'The Ummah', 'Deceased family member'"
              />
              <p className="text-sm text-gray-600 mt-1">
                Dedicate this dua and donation to someone special
              </p>
            </div>

            {/* Personal Message */}
            <div>
              <Label htmlFor="message">Personal Message (optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Add a personal message or specific intention..."
                rows={3}
              />
            </div>

            {/* Anonymous Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={formData.isAnonymous}
                onCheckedChange={(checked) => 
                  setFormData({...formData, isAnonymous: checked as boolean})
                }
              />
              <Label htmlFor="anonymous">Make this donation anonymous</Label>
            </div>

            {/* Summary Box */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-800 mb-2">Donation Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-semibold">£{formData.amount || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jannah Points:</span>
                    <span className="font-semibold text-purple-600">
                      +{Math.floor((parseFloat(formData.amount) || 0) * 10)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sadaqah Coins:</span>
                    <span className="font-semibold text-yellow-600">
                      +{Math.floor(parseFloat(formData.amount) || 0)}
                    </span>
                  </div>
                  {formData.onBehalfOf && (
                    <div className="flex justify-between">
                      <span>Dedicated to:</span>
                      <span className="font-semibold text-blue-600">{formData.onBehalfOf}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isSubmitting || !formData.amount}
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  <Gift className="h-4 w-4 mr-2" />
                  Donate £{formData.amount || '0.00'}
                </>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DuaDonationDialog;
