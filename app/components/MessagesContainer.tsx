"use client"
import React from 'react'
import Message from './Message'
import { useSocket } from '../context/SocketState'
const MessagesContainer = () => {
  const {Messages,socketid, Users}= useSocket()

  return (
    <div className="h-[75vh] overflow-y-auto p-4 pb-36">
      {Messages && 
      Messages.map(e=>{
        let name="Unavailable"
        for(let i of Users){
          if(e.socketid==i.socketid){
            name= i.name;
            break;
          }
        }
      return(<Message key={e.message} name={name} type={socketid==e.socketid ? "OUTGOING" :"INCOMING"} message={e.message} />)
      })
      } 
    </div>
  )
}

export default MessagesContainer