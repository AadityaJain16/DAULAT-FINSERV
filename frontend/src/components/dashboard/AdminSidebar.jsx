import {
  LayoutDashboard,
  Users,
  Wallet,
  BarChart3,
  Bell,
  LogOut,
  HandCoins,
  Menu,
  X,
  Activity,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] =
    useState(false);

  const navItems = [
    {
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: <Users size={18} />,
      label: "Investors",
      path: "/admin/investors",
    },
    
    
    {
      icon: <BarChart3 size={18} />,
      label: "Reports",
      path: "/admin/reports",
    },
    {
  icon: <Activity size={18} />,
  label: "Activity Logs",
  path: "/admin/activity-logs",
},
    {
      icon: <Bell size={18} />,
      label: "Notifications",
      path: "/admin/notifications",
    },
  ];

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <>
      {/* Mobile Header */}

      <div
        className="
          lg:hidden
          fixed
          top-0
          left-0
          right-0
          z-50
          h-16
          bg-black/30
          backdrop-blur-xl
          border-b
          border-white/10
          flex
          items-center
          justify-between
          px-4
        "
      >
        <h1
          className="
            text-xl
            font-bold
            bg-gradient-to-r
            from-[#7C6FFF]
            to-[#00D2B4]
            bg-clip-text
            text-transparent
          "
        >
          DAULAT FINSERV
        </h1>

        <button
          onClick={() =>
            setIsOpen(!isOpen)
          }
        >
          {isOpen ? (
            <X />
          ) : (
            <Menu />
          )}
        </button>
      </div>

      {/* Overlay */}

      {isOpen && (
        <div
          onClick={() =>
            setIsOpen(false)
          }
          className="
            lg:hidden
            fixed
            inset-0
            bg-black/50
            z-40
          "
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed
          lg:static
          top-0
          left-0
          h-screen
          w-72
          bg-white/5
          border-r
          border-white/10
          backdrop-blur-xl
          p-6
          z-50
          transition-transform
          duration-300

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <h1
          className="
            text-3xl
            font-bold
            mb-10
            bg-gradient-to-r
            from-[#7C6FFF]
            to-[#00D2B4]
            bg-clip-text
            text-transparent
          "
        >
          DAULAT FINSERV
        </h1>

        <nav className="space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() =>
                setIsOpen(false)
              }
              className={({
                isActive,
              }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-[#7C6FFF]/20 border border-[#7C6FFF]/40 text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {item.icon}
              <span>
                {item.label}
              </span>
            </NavLink>
          ))}

          <button
            onClick={
              handleLogout
            }
            className="
              flex
              items-center
              gap-3
              p-3
              mt-8
              text-red-400
              hover:text-red-300
            "
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;