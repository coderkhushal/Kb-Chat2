
import { createContext} from "react";

type userType= {
    name?:string
}
interface AuthContextProps {
    user?: userType;
    setuser?: (user:userType)=>void
}
export const AuthContext= createContext<AuthContextProps>({})
