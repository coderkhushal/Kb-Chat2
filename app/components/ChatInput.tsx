"use client"
import React, { useState } from 'react'
import { useAuth } from '../context/AuthState'
import { useSocket,messagedatatype } from '../context/SocketState'

const ChatInput = () => {
  const [message, setmessage]=useState<messagedatatype>({message:"", socketid:null, type:"OUTGOING"})
  const {sendMessage,socketid} = useSocket()
  const {user}= useAuth()
  const handleonchange=(e:any)=>{
    setmessage({message:e.target.value,type:"OUTGOING",socketid:socketid})
  }
  const handleSubmit=(e:React.SyntheticEvent)=>{
    e.preventDefault()
    sendMessage(message);
    setmessage({...message,"message":"" })
  } 

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.ctrlKey && event.key === 'Enter') {
      event.preventDefault(); // Prevent default newline behavior
      handleSubmit(event)
      }
  };

  return (
    <footer className="bg-white border-t border-gray-300 p-4 relative bottom-0 w-full md:w-full ">
    <form className="flex items-center w-full border ">
        <textarea onKeyDown={handleKeyDown}  value={message?.message} placeholder="Type a message..." onChange={handleonchange} className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"/>
        <button type='submit' className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2" onClick={handleSubmit}>Send</button>
    </form>
</footer>
  )
}

export default ChatInput