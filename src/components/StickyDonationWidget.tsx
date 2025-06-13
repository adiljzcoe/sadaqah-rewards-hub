import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Zap, Gift } from 'lucide-react';

const StickyDonationWidget = () => {
  // Hide this widget since we have the floating tab widget now
  return null;

  // const [amount, setAmount] = useState('');

  // return (
  //   <div className="fixed bottom-0 left-0 w-full bg-white border-t z-50">
  //     <Card className="w-full">
  //       <CardContent className="p-4 flex items-center justify-between">
  //         <div className="flex items-center space-x-2">
  //           <Heart className="h-5 w-5 text-red-500" />
  //           <p className="text-sm font-medium">Make a Donation</p>
  //         </div>
  //         <div className="flex items-center space-x-4">
  //           <Input
  //             type="number"
  //             placeholder="Enter amount"
  //             className="w-24 h-9 text-sm"
  //             value={amount}
  //             onChange={(e) => setAmount(e.target.value)}
  //           />
  //           <Button size="sm">Donate</Button>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
};

export default StickyDonationWidget;
