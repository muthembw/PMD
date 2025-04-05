import { useState } from "react";
import { Bell, Search, UserCircle } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 
import UserMenu from "../components/userMenu"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle user menu
  const { user } = useContext(AuthContext); // To get the user context

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle the menu visibility
  };

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 md:ml-64 sticky top-0 z-10">
      <div className="flex items-center gap-3 w-full max-w-lg">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-6 relative">
        <Bell className="text-gray-600 cursor-pointer" />
        
        {/* User Circle - Clicking will toggle the menu */}
        <UserCircle
          className="text-gray-600 cursor-pointer"
          size={28}
          onClick={toggleMenu} // Toggle user menu on click
        />

        {/* Display User Menu if the menu is open */}
        {isMenuOpen && <UserMenu />} {/* Only render if the menu is toggled open */}
      </div>
    </header>
  );
};

export default Navbar;
