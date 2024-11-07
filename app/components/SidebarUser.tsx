import React from 'react'
import { useSocket } from '../context/SocketState';
interface SidebarUserProps{
  Name:string;
  LastMessage?:string
  SocketId:string
}
const SidebarUser :React.FC<SidebarUserProps>= ({Name, LastMessage, SocketId}) => {
  const {UserName, socketid}= useSocket()
  return (
          <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
            <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
        </div>
        <div className="flex-1">
            <h2 className="text-lg font-semibold">{Name}{(Name==UserName && SocketId==socketid)&&"(You)"}</h2>
            {/* <p className="text-gray-600">"hllo"</p> */}
        </div>
    



</div>
  )
}

export default SidebarUser