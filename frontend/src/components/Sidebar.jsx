import { LiaDownloadSolid } from "react-icons/lia";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaHome, FaBars } from "react-icons/fa";
import { useState } from "react";

function Sidebar() {
    const [isOpen, setOpen] = useState(true);

    return (
        <aside>
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

        </aside>
    )
}

export default Sidebar;