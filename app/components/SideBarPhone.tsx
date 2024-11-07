"use client"
import React from 'react'
import SidebarUser from './SidebarUser'
import { useSocket } from '../context/SocketState'
import Loading from './Loading'
const SIdebarPhone= ({reference,toggleUsers}:{reference:any, toggleUsers:()=>void}) => {
    const {Users , loading}= useSocket()
    return (

        <div ref={reference} className="w-[20rem] fixed top-0 -left-80 transition-transform translate-x-0 transform md:hidden block bg-white border-r h-full  border-gray-300 ">
            {/* <!-- Sidebar Header --> */}
            <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                <h1 className="text-2xl font-semibold">Users</h1>
                <div className="relative">
                    <button id="menuButton"  onClick={()=>toggleUsers()} className="focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                        </svg>
                    </button>
                    {/* <!-- Menu Dropdown --> */}
                    <div id="menuDropdown" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden">
                        <ul className="py-2 px-3">
                            <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
                            <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
                            {/* <!-- Add more menu options here --> */}
                        </ul>
                    </div>
                </div>
            </header>

            {/* <!-- Contact List --> */}
            <div className="overflow-y-auto h-full p-3 mb-9 pb-20">
            {loading  && <Loading/>}
            {Users ? Users.map(e=><SidebarUser key={e.socketid} Name={e.name} SocketId={e.socketid} />) : <Loading/> }
            </div>
        
        </div>

    )
}

export default SIdebarPhone