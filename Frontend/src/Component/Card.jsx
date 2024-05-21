import { useState } from "react";
import { useUserContext } from "../Context/UserContext";

export default function Card({ url, imagename, keyvalue }) {
  const {getData} = useUserContext()
    function HandleDelete(){
      const url = 'http://localhost:8000/gallery/v1/deleteimage'
      fetch(url, {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({publicid:keyvalue}),
        credentials:'include'
      }).then((response)=> response.json())
      .then((result)=> {
        const {code, message} = result
        if(code==='01'){
          alert(message)
        }
        else if(code === '02'){
          getData()
          alert(message)
        }
        else{
          alert('SomeThing Unexpected Happened')
        }
      })
    }
    
    return (
      <div className="relative h-[400px] w-[300px] rounded-md overflow-hidden">
        <img
          src={url}
          key={keyvalue}
          alt="Image"
          className="z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-left">
          <button onClick={HandleDelete} className="bg-black text-white text-xl p-2">Delete</button>
          <p className="mt-2 text-sm text-gray-300">
            {imagename}
          </p>
        </div>
      </div>
    );
  }