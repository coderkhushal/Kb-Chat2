"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSocket } from '../context/SocketState'
export type FormValues= {
  name:string;
  roomid?:string
}
const page = () => {
  const [Variant, setVariant]= useState<"CHATROOM" | "PRIVATE">("CHATROOM")
  const { setUserName, JoinChatRoom}= useSocket()

  const router = useRouter()
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

export default page