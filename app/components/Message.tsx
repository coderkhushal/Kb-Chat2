import React from 'react'
interface MessageProps {
    type: "INCOMING" | "OUTGOING";
    message:string;
    name:string
}
const Message: React.FC<MessageProps> = ({ type, message,name }) => {
    if (type === "INCOMING") {

        return (
            <div className="flex mb-4 cursor-pointer">
                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                    <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                </div>
                <div className="flex flex-col max-w-96 bg-indigo-300 rounded-lg p-3">
                    <p className=' text-sm font-bold'>{name}</p>
                    <p className="text-gray-700">{message}</p>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="flex justify-end mb-4 cursor-pointer">
                <div className="flex flex-col max-w-96 bg-indigo-500 text-white rounded-lg p-3 ">
    <p className=' text-sm font-bold'>You</p>
                    <p>{message}</p>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                    <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                </div>
            </div>


        )
    }
}

export default Message