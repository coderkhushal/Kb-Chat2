"use client"
import SIdebar from "./components/SIdebar";
import ChatInput from "./components/ChatInput";
import MessagesContainer from "./components/MessagesContainer";
import { useRef, useState } from "react";
import { useSocket } from "./context/SocketState";
import { FormValues } from "./auth/page";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import SIdebarPhone from "./components/SideBarPhone";
export default function Home() {
  const [Variant, setVariant]= useState<"CHATROOM" | "PRIVATE">("CHATROOM")
  const {setUserName,UserName,  JoinChatRoom}= useSocket()
  const router = useRouter()
  
  const toggleUsers=()=>{
   
    if(ref?.current?.classList.contains("translate-x-full")){
      ref.current.classList.remove("translate-x-full")
      ref.current.classList.add("translate-x-0")
    }
    else if(ref?.current?.classList.contains("translate-x-0")){
      
      ref.current.classList.remove("translate-x-0")
      ref.current.classList.add("translate-x-full")
    }
  }
  const ref= useRef<HTMLDivElement>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onsubmit:SubmitHandler<FormValues> = (data)=>{
    setUserName(data.name)
    JoinChatRoom(data.name)
    router.push("/")
  }

  if(UserName===""){
    //give the authentication page
    return (
      <div className='flex items-center justify-center min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-br'>
    <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl'>
        <div className='max-w-md mx-auto space-y-3'>
            <h3 className="text-lg font-semibold">&#128540; Login As Guest</h3>
            <form onSubmit={handleSubmit(onsubmit)}>

            <div>
                <label className="block py-1">Your Name</label>
                <input {...register("name")} type="text" className="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono" required/>
                <p className="text-sm mt-2 px-2 hidden text-gray-600">Name</p>
            </div >
            {Variant==="PRIVATE" &&
            <div>
                <label className="block py-1">Room Id</label>
                <input  {...register("roomid")} type="text" className="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono"/>
            </div>
            }
            <div className="flex gap-3 pt-3 items-center">
                <button type="submit"  className="border hover:border-indigo-600 px-4 py-2 rounded-lg shadow ring-1 ring-inset ring-gray-300">Join
                </button>
                
            </div>
            </form>
        </div>
    </div>
</div>
    )
  }
  return (
    <>
            <ToastContainer autoClose={1000}/>    
    <div className="flex h-full overflow-y-auto">
        {/* <!-- Sidebar --> */}
       <SIdebar/>
        
        {/* <!-- Main Chat Area --> */}
        <div className="flex-1">
            {/* <!-- Chat Header --> */}
            <header className=" shadow-lg overflow-x-hidden">
       <SIdebarPhone reference= {ref} toggleUsers={toggleUsers}/>
       <div className="flex bg-white py-4 w-full text-gray-700">

              <button className="block md:hidden mx-2 shadow-l rounded-l px-2 bg-indigo-400 text-white " onClick={()=>toggleUsers()}>Users</button>
                <h1 className="text-2xl font-semibold">Group Chat</h1>
               
       </div>
            </header>
            
            {/* <!-- Chat Messages --> */}
            <MessagesContainer/>

    
    
               
            
            
            {/* <!-- Chat Input --> */}
            <ChatInput/>
        </div>
    </div>
    
    </>
  );
}
