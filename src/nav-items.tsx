
import { Home, Calendar, Heart } from "lucide-react";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: Home,
    page: <div>Home</div>, // This will be replaced by actual components if needed
  },
  {
    title: "Ramadan Calendar",
    to: "/ramadan-calendar",
    icon: Calendar,
    page: <div>Ramadan Calendar</div>,
  },
  {
    title: "Dhikr Community",
    to: "/dhikr-community",
    icon: Heart,
    page: <div>Dhikr Community</div>,
  },
];
