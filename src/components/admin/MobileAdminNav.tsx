
import React from 'react';
import { BarChart3, ShoppingBag, Gift, UserCheck, Mail, DollarSign } from 'lucide-react';

interface MobileAdminNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileAdminNav = ({ activeTab, setActiveTab }: MobileAdminNavProps) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'gift-cards', label: 'Gift Cards', icon: Gift },
    { id: 'disbursements', label: 'Disbursements', icon: DollarSign },
    { id: 'affiliates', label: 'Affiliates', icon: UserCheck },
    { id: 'marketing', label: 'Marketing', icon: Mail },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors text-xs ${
                activeTab === item.id
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <IconComponent className="h-4 w-4 mb-1" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileAdminNav;
