import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiInfo, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Dashboard", path: "/todo", icon: <FiHome /> },
  { name: "Profile", path: "/profile", icon: <FiUser /> },
  { name: "Settings", path: "/settings", icon: <FiSettings /> },
  { name: "About", path: "/about", icon: <FiInfo /> },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [active, setActive] = useState("/todo");

  useEffect(() => {
    setActive(window.location.pathname);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r shadow-sm p-4">
      <div className="text-2xl font-bold mb-6">📝 ToDo App</div>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ name, path, icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive || active === path
                  ? "bg-pink-100 text-pink-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
            onClick={() => setActive(path)}
          >
            <span className="text-lg">{icon}</span>
            {name}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 text-red-500 hover:bg-red-100 px-4 py-2 rounded-lg"
      >
        <FiLogOut className="text-lg" /> Logout
      </button>
    </aside>
  );
}
