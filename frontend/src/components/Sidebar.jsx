import { LiaDownloadSolid } from "react-icons/lia";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { FaUserCircle, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar({ isOpen, collapsed, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`bg-white border-r z-40 flex flex-col transition-all duration-300
          fixed md:static top-0 left-0 h-full
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${collapsed ? "w-20" : "w-56"}
        `}
      >
        <ul className="px-2 py-6 space-y-1">
          <li>
            <Link
              to="/"
              className="px-2 py-3 rounded-xl flex items-center hover:bg-zinc-200"
              onClick={onClose}
            >
              <FaHome size={22} />
              {!collapsed && <span className="ml-3">Home</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/shorts"
              className="px-2 py-3 rounded-xl flex items-center hover:bg-zinc-200"
              onClick={onClose}
            >
              <SiYoutubeshorts size={22} />
              {!collapsed && <span className="ml-3">Shorts</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/subscriptions"
              className="px-2 py-3 rounded-xl flex items-center hover:bg-zinc-200"
              onClick={onClose}
            >
              <MdSubscriptions size={22} />
              {!collapsed && <span className="ml-3">Subscriptions</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/channel"
              className="px-2 py-3 rounded-xl flex items-center hover:bg-zinc-200"
              onClick={onClose}
            >
              <FaUserCircle size={22} />
              {!collapsed && <span className="ml-3">Profile</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/downloads"
              className="px-2 py-3 rounded-xl flex items-center hover:bg-zinc-200"
              onClick={onClose}
            >
              <LiaDownloadSolid size={22} />
              {!collapsed && <span className="ml-3">Downloads</span>}
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
