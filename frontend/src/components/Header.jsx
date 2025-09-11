import { FaYoutube, FaSearch, FaHome, FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbBell } from "react-icons/tb";
import { LiaDownloadSolid } from "react-icons/lia";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

function Header() {
    const [isOpen, setOpen] = useState(true);

    return (
        <header className="flex h-screen">
            {/* Sidebar */}
            <div className={`${isOpen ? "w-50" : "w-20"} py-4.5 hidden md:flex flex-col transition-all duration-300`}>
                <p className="px-6">
                    <FaBars size={22} className="cursor-pointer" onClick={() => setOpen(!isOpen)} />
                </p>

                <ul className="px-4 py-6 space-y-1">
                    <li className="px-2 py-4 rounded-xl flex items-center space-x-3 cursor-pointer hover:bg-zinc-200">
                        <FaHome size={24} />
                        {isOpen && <span>Home</span>}
                    </li>
                    <li className="px-2 py-4 rounded-xl flex items-center space-x-3 cursor-pointer hover:bg-zinc-200">
                        <SiYoutubeshorts size={24} />
                        {isOpen && <span>Shorts</span>}
                    </li>
                    <li className="px-2 py-4 rounded-xl flex items-center space-x-3 cursor-pointer hover:bg-zinc-200">
                        <MdSubscriptions size={24} />
                        {isOpen && <span>Subscriptions</span>}
                    </li>
                    <li className="px-2 py-4 rounded-xl flex items-center space-x-3 cursor-pointer hover:bg-zinc-200">
                        <FaUserCircle size={24} />
                        {isOpen && <span>Profile</span>}
                    </li>
                    <li className="px-2 py-4 rounded-xl flex items-center space-x-3 cursor-pointer hover:bg-zinc-200">
                        <LiaDownloadSolid size={24} />
                        {isOpen && <span>Downloads</span>}
                    </li>
                </ul>
            </div>


            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <div className="flex items-center justify-between px-3 pr-13 py-3">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <FaYoutube size={28} className="text-red-500" />
                            <h1 className="ml-1 text-xl font-bold hidden sm:block">YouTube Clone</h1>
                        </div>
                    </div>

                    <form className="flex items-center bg-gray-100 px-2.5 rounded-2xl w-1/2 max-w-lg">
                        <input type="text" placeholder="Search" className="flex-1 bg-transparent px-2 py-1 outline-none" />
                        <button className="px-2"><FaSearch className="text-gray-600" /></button>
                    </form>

                    <div className="flex items-center space-x-4">
                        <TbBell size={28} />
                        <button className="flex text-lg cursor-pointer"><CgProfile size={28} className="mr-1" />Sign In</button>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header;