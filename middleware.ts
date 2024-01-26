
import { NextRequest, NextResponse } from "next/server";
export function middleware(request:NextRequest){
    // if user doesot exist then go to /auth
    // let user={name:"khushal"}
    // if(Object.keys(user).length==0){
    //     return NextResponse.redirect(new URL("/auth", request.url))
    // }
}

export const config={
    matcher:"/"
}