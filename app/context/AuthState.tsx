"use client"
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
type userType= {
    name?:string
}

interface AuthProviderProps{
    children:React.ReactNode
}
export function useAuth(){
    return useContext(AuthContext)
}

const AuthProvider:React.FC<AuthProviderProps>= (props)=>{
    const [user, setuser]= useState<userType>({name:"khshal"})
    return(
        <AuthContext.Provider value={{user, setuser}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthProvider

