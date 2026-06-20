import {
  House,
  ChartColumn,
  History,
  Bell,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navItems = [
  {
    icon: <House size={20} />,
    label: "Home",
    path: "/investor/dashboard",
  },
  {
    icon: <ChartColumn size={20} />,
    label: "Portfolio",
    path: "/investor/portfolio",
  },
  {
    icon: <History size={20} />,
    label: "History",
    path: "/investor/history",
  },
  {
    icon: <Bell size={20} />,
    label: "Alerts",
    path: "/investor/notifications",
  },
  {
    icon: <User size={20} />,
    label: "Profile",
    path: "/investor/profile",
  },
];

const BottomNav = () => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-lg">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl px-4 py-3 flex justify-between">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
  `flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-300 ${
   isActive
  ? "text-white bg-[#7C6FFF]/20 border border-[#7C6FFF]/30"
      : "text-slate-400 hover:text-white"
  }`
}
          >
            {item.icon}
<span className="text-xs mt-1">             
   {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;