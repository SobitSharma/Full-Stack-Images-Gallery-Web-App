import { useState } from "react";
import { useUserContext } from "../Context/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responsemessage, setresponsemessge] = useState('')
  const {updateloginstatus} = useUserContext()

  function HandleLogin() {
    const data = { username, password };
    const url = "http://localhost:8000/gallery/v1/login";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((result)=> {
        const {code, message}=result
        if(code === '01'){
          setresponsemessge('The crendentials are not Valid')
          updateloginstatus(false)
        }
        else if(code === '00'){
          alert('ALl fields should be filled')
          updateloginstatus(false)
        }
        else if(code === '03'){
          setresponsemessge('The password is Incorrect')
          updateloginstatus(false)
        }
        else if(code ==='02'){
          setresponsemessge('The Login is Success Full')
          updateloginstatus(true)
          
        }
        else{
          setresponsemessge('Unexpected Thing Happened')
          updateloginstatus(false)
        }
      })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Welcome to Our Login Page
        </h1>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={HandleLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <h3>{responsemessage}</h3>
    </div>
  );
}