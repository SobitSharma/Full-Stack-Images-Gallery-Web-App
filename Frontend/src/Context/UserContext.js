import { createContext, useContext } from "react";

export const User = createContext({
    userlogin:false,
    userUploads:[],
    updateUploads:()=>{},
    updateloginstatus:()=> {},
    getData:()=>{},
    AllData:[]
})

export const UserContextProvider = User.Provider

export function useUserContext(){
    return useContext(User)
}