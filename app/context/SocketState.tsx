"use client"
import React, {  useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"
import { createContext } from "react"
import { toast } from "react-toastify"
// import { host } from "../constants"
const host="http://localhost:4000"
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
        JoinChatRoom: (name:string)=>void;
        loading?:boolean
        setloading?:(l :boolean)=>void
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
        const [loading , setloading]= useState<boolean>(false)
        
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
                
                let res= await fetch(host+"/messages")
                let resData= await res.json()
                setMessages(resData)
        }
        const fetchUsers=async()=>{
                let res= await fetch(host+"/users")
                let resData= await res.json()
                
                setUsers(resData)
        }
        useEffect(()=>{
                if(host){

                        fetchMessages()
                        fetchUsers()
                        const _socket= io(host)
                        const handleOnMessageRec=(data:any)=>{
                        setMessages(data)
                        
                }
                const handleUpdateUsers=(data:{users:Usertype[],name:string})=>{
                        
                        setUsers(data.users)
                        toast.info(`${data.name} joined`)
                }
                const handleDisconnectUser= (data:{users:Usertype[], name:string})=>{
                        setUsers(data.users)
                        toast.info(`${data.name} Disconnected`)
                }
                _socket.on("message",handleOnMessageRec)
                _socket.on("new-user",handleUpdateUsers)
                _socket.on("user-disconnected",handleDisconnectUser)
                
                setsocket(_socket)
                
                return(()=>{
                        _socket.off("new-user")
                        _socket.disconnect()
                        setsocket(null)
                })
        }
        else{
                console.log("host not found")
        }
        },[host])
        return(
                <SocketContext.Provider value={{sendMessage, Messages,loading,setloading, socketid:socket?.id, Users, UserName, setUserName, JoinChatRoom}}>
                        {props.children}
                </SocketContext.Provider>
        )
}
export default SocketProvider