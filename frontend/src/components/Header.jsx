import { FaYoutube, FaSearch, FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbBell } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

function Header({ onToggleSidebar, onCollapseSidebar }) {
  const { user, logout } = useContext(AuthContext);
    const [query, setQuery] = useState("");
  
    const handleSearch = (e) => {
      e.preventDefault();
      onSearch(query);
    };
    
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => {
            if (window.innerWidth < 768) {
              onToggleSidebar(); // mobile
            } else {
              onCollapseSidebar(); // desktop
            }
          }}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <FaBars size={20} />
        </button>
        <div className="flex items-center">
          <FaYoutube size={28} className="text-red-500" />
          <Link to="/" className="ml-1 text-xl font-bold hidden sm:block">
            YouTube Clone
          </Link>
        </div>
      </div>

      {/* Middle: Search */}
      <form onSubmit={handleSearch} className="flex items-center bg-gray-100 px-2.5 rounded-2xl w-1/2 max-w-lg">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent px-2 py-1 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="px-2">
          <FaSearch className="text-gray-600" />
        </button>
      </form>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        <TbBell size={28} />
        {user ? (
          <div className="flex items-center gap-2">
            <span>{user.username}</span>
            <button onClick={logout} className="bg-gray-700 px-2 py-1 rounded">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="flex text-lg cursor-pointer">
            <CgProfile size={28} className="mr-1" />
            Sign In
          </Link>
        )}

      </div>
    </header>
  );
}

export default Header;
