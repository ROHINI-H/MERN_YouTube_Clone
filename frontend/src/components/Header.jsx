import { FaYoutube, FaSearch, FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbBell } from "react-icons/tb";

function Header({ onToggleSidebar, onCollapseSidebar }) {
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
          <h1 className="ml-1 text-xl font-bold hidden sm:block">
            YouTube Clone
          </h1>
        </div>
      </div>

      {/* Middle: Search */}
      <form className="flex items-center bg-gray-100 px-2.5 rounded-2xl w-1/2 max-w-lg">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent px-2 py-1 outline-none"
        />
        <button className="px-2">
          <FaSearch className="text-gray-600" />
        </button>
      </form>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        <TbBell size={28} />
        <button className="flex text-lg cursor-pointer">
          <CgProfile size={28} className="mr-1" />
          Sign In
        </button>
      </div>
    </header>
  );
}

export default Header;
