import { useThemeUser } from "../Context/useThemeUser";
import { FiSun, FiMoon, FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { currentUser, toggleTheme, theme } = useThemeUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      {/* Hello, username */}
      <h1 className="text-xl font-semibold ">
        Hello, {currentUser?.username || "Guest"}
      </h1>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>

        {/* Profile Button */}
        <button
          onClick={() => navigate("/profile")}
          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition flex items-center gap-2"
        >
          <FiUser /> Profile
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition flex items-center gap-2"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </header>
  );
}
