import { useRef } from "react";
import { useUserContext } from "../Context/UserContext";

export default function Upload() {
  const {userlogin, updateloginstatus, getData} = useUserContext()
  const fileRef = useRef();
  function HandleUpload() {
    const allowedTypes = ['jpg','jpeg', 'png', 'gif']
    const url = "http://localhost:8000/gallery/v1/uploadFile";
    const file = fileRef.current.files[0];
    let validation;
    if(file){
      validation = file.type.split('/')
    }
    else{
      alert('The file should not be empty')
    }
    if(allowedTypes.includes(validation[1])){
      const form = new FormData();
      form.append("image", file);
      fetch(url, {
        method: "POST",
        body: form,
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          const {code, message} = result
          if(code === '401' || code ==='402'){
            updateloginstatus(false)
            alert('Please Login Again To perform This action')
          }
          else if(code === '02'){
            getData()
            alert('Upload SuccessFull')

          }
        })
        .catch((error) => {
          updateloginstatus(false)
          console.log(error)
        });
    }
    else{
      alert("The file should not be empty and allowed formats are jpg, jpeg, png, gif")
    }
    }
    
  if (userlogin){
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
            Upload File
          </h1>
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mb-6">
              <label
                htmlFor="file-input"
                className="block text-sm font-medium text-gray-700"
              >
                Select File
              </label>
              <input
                type="file"
                id="file-input"
                ref={fileRef}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={HandleUpload}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  else{
    return(
      <>
      <h1 className="">Please Login First</h1>
      </>
    )
  }
 
}