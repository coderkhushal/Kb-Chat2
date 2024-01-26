"use client"
import React, {  useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"
import { createContext } from "react"

export type messagedatatype ={
        message:string;
        type:"INCOMING" | "OUTGOING";
        socketid:string | undefined | null;

}
export type Usertype={
        name:string;
        socketid:string
}

interface SocketContextProps{
        sendMessage:(message:messagedatatype)=>void;
        Messages:messagedatatype[];
        socketid:string | undefined | null;
        Users:Usertype[];
        UserName:string;
        setUserName : (name:string)=>void;
        JoinChatRoom: (name:string)=>void
}
const SocketContext= createContext<SocketContextProps | null>(null)

interface SocketProviderProps{
        children:React.ReactNode
}

export const useSocket= ()=> {
        let state= useContext(SocketContext) 
        if(state){
                return state
        }
        else{
                throw new Error("undefined state")
        }
}

const SocketProvider:React.FC<SocketProviderProps>= (props)=>{
        const [socket, setsocket]= useState<Socket | null>()
        const [Messages, setMessages]= useState<messagedatatype[]>([])
        const [Users, setUsers]= useState<Usertype[]>([])
        const [UserName, setUserName]= useState<string>("")
        
        const sendMessage=(messagedata:messagedatatype)=>{
                if(socket){
                        socket.emit("event:message",{...messagedata})
                        
                }
                
        }
        const JoinChatRoom=async(name:string)=>{
                if(socket){
                        socket.emit("event:join-room",name)
                }
        }
        const fetchMessages=async()=>{
                let res= await fetch("http://localhost:4000/messages")
                let resData= await res.json()
                setMessages(resData)
        }
        const fetchUsers=async()=>{
                let res= await fetch("http://localhost:4000/users")
                let resData= await res.json()
                
                setUsers(resData)
        }
        useEffect(()=>{
                fetchMessages()
                fetchUsers()
                const _socket= io("http://localhost:4000")
                const handleOnMessageRec=(data:any)=>{
                        setMessages(data)
                        
                }
                const handleUpdateUsers=(data:Usertype[])=>{
                        
                        setUsers(data)
                }
                _socket.on("message",handleOnMessageRec)
                _socket.on("new-user",handleUpdateUsers)
                setsocket(_socket)
                
                return(()=>{
                        _socket.off("new-user")
                        _socket.disconnect()
                        setsocket(null)
                })
        },[])
        return(
                <SocketContext.Provider value={{sendMessage, Messages,socketid:socket?.id, Users, UserName, setUserName, JoinChatRoom}}>
                        {props.children}
                </SocketContext.Provider>
        )
}
export default SocketProvider