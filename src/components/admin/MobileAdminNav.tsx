
import { 
  BarChart3, 
  ShoppingBag, 
  Gift, 
  DollarSign, 
  UserCheck, 
  Mail,
  Database
} from "lucide-react";

interface MobileAdminNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileAdminNav = ({ activeTab, setActiveTab }: MobileAdminNavProps) => {
  const navItems = [
    { id: "overview", icon: BarChart3, label: "Overview" },
    { id: "products", icon: ShoppingBag, label: "Products" },
    { id: "gift-cards", icon: Gift, label: "Cards" },
    { id: "disbursements", icon: DollarSign, label: "Money" },
    { id: "affiliates", icon: UserCheck, label: "Partners" },
    { id: "marketing", icon: Mail, label: "Marketing" },
    { id: "test-data", icon: Database, label: "Data" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                isActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <IconComponent className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileAdminNav;
