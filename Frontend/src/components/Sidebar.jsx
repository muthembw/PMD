import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Box, ShoppingCart, FileText, Settings } from "lucide-react";
import { AuthContext } from "../context/AuthContext"; // Import the AuthContext

const Sidebar = () => {
  const { user, setUser, setToken } = useContext(AuthContext); // Get user state from context
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: <Home />, path: "/dashboard" },
    { name: "Products", icon: <Box />, path: "/products" },
    { name: "Orders", icon: <ShoppingCart />, path: "/orders" },
    { name: "Report", icon: <FileText />, path: "/report" },
    { name: "Settings", icon: <Settings />, path: "/settings" },
  ];

  const handleAuthButtonClick = () => {
    if (user) {
      // Log out the user
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      console.log("User logged out");
    } else {
      // Navigate to login if not logged in
      navigate("/login");
    }
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-md fixed top-0 left-0 p-5 hidden md:block">
      <h2 className="text-2xl font-bold text-gray-800 mb-10">PM Dashboard</h2>
      <nav className="flex flex-col gap-4">
        {navItems.map(({ name, icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 ${
                isActive ? "bg-gray-200 font-semibold" : ""
              }`
            }
          >
            {icon}
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Authentication Button */}
      <div className="mt-auto p-4">
        <div className="flex flex-col gap-2">
          {user ? (
            // If logged in, show logout button
            <button
              onClick={handleAuthButtonClick}
              className="w-full p-2 bg-red-600 hover:bg-red-700 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              {/* If not logged in, show login and register buttons */}
              <button
                onClick={() => navigate("/login")}
                className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="w-full p-2 bg-green-600 hover:bg-green-700 rounded"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
