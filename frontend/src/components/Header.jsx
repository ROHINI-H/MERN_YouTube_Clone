import { FaYoutube, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbBell } from "react-icons/tb";
import { useState } from "react";

function Header() {
    return (
        <header className="flex h-screen">

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