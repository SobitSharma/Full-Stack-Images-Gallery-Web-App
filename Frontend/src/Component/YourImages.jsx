import { useState } from "react";
import Card from "./Card";
import { useUserContext } from "../Context/UserContext";

export default function YourImages(){
    const {userUploads, userlogin} = useUserContext()
    console.log(userUploads)
    if(userlogin && userUploads){
        return(
            <>
            <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {   
                userUploads ? userUploads.map((single)=> (
                    <Card url={single.url} imagename={single.imagename} keyvalue={single.publicid}/>
                )):''
            }
            </div>
            </div>
            </>
        )
    }
    else{
        return(
            <>
            <h1>You are not logged In</h1>
            </>
        )
    }
}