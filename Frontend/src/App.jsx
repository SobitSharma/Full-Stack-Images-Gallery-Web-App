import { Outlet } from "react-router-dom"
import Header from "./Component/Header"
import Footer from "./Component/Footer"
import { UserContextProvider } from "./Context/UserContext"
import { useEffect, useState } from "react"

function App(){
  const [userlogin, setUserLogin] = useState(false)
  const [userUploads, setuseruploads] = useState([])
  const [AllData, setAllData] = useState([])
  const updateUploads = (id) => {
    if(userUploads){
      setuseruploads((previousearry)=> previousearry.filter((singleval)=> singleval.publicid !== id))
    }
  }
  const updateloginstatus = (flag)=> {
    setUserLogin(flag)
  }

  function getData(){
    if(userlogin){
      const url = "http://localhost:8000/gallery/v1/getUserImages";
      fetch(url,{
          method:'POST',
          credentials:'include'
      }).then((respose)=> respose.json())
      .then((result)=>{
          if(result){
            const {data} = result
            setuseruploads(data)
          }
      })

      fetch('http://localhost:8000/gallery/v1/getallusers', {
        method:'POST',
        credentials:'include'
      }).then((response)=> response.json())
      .then((result)=> {
        const {Data, message} = result
        setAllData(Data)
      })
    }
    else{
      setuseruploads([])
    }
  }
  useEffect(getData, [userlogin])
  
  return(
    <UserContextProvider value={{userUploads,updateUploads,userlogin, updateloginstatus, getData, AllData}}>
    <Header/>
    <Outlet/>
    <Footer/>
    </UserContextProvider>
  )
}

export default App