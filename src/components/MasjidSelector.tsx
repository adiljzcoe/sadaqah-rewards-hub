
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Users, Building } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Masjid {
  id: string;
  name: string;
  location: string;
  memberCount: number;
  totalDonations: number;
  rank: number;
  verified: boolean;
}

const mockMasjids: Masjid[] = [
  {
    id: '1',
    name: 'Central London Mosque',
    location: 'London, UK',
    memberCount: 247,
    totalDonations: 15420,
    rank: 3,
    verified: true
  },
  {
    id: '2',
    name: 'Birmingham Islamic Centre',
    location: 'Birmingham, UK',
    memberCount: 189,
    totalDonations: 12350,
    rank: 7,
    verified: true
  },
  {
    id: '3',
    name: 'Manchester Central Mosque',
    location: 'Manchester, UK',
    memberCount: 156,
    totalDonations: 8920,
    rank: 12,
    verified: true
  }
];

interface MasjidSelectorProps {
  onSelect: (masjid: Masjid) => void;
  selectedMasjid?: Masjid | null;
}

const MasjidSelector = ({ onSelect, selectedMasjid }: MasjidSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredMasjids = mockMasjids.filter(masjid =>
    masjid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    masjid.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (masjid: Masjid) => {
    onSelect(masjid);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={selectedMasjid ? "default" : "outline"} 
          className="w-full justify-start"
        >
          <Building className="h-4 w-4 mr-2" />
          {selectedMasjid ? selectedMasjid.name : "Select Your Masjid"}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Your Masjid</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="space-y-3">
            {filteredMasjids.map((masjid) => (
              <Card 
                key={masjid.id} 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSelect(masjid)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{masjid.name}</h3>
                      {masjid.verified && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Verified
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        Rank #{masjid.rank}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {masjid.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {masjid.memberCount} members
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-lg text-green-600">
                      £{masjid.totalDonations.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Total donated</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 text-center">
              Can't find your masjid? 
              <Button variant="link" className="p-0 ml-1 h-auto">
                Request to add it
              </Button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MasjidSelector;
