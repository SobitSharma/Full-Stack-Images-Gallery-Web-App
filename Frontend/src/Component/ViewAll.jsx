import { useUserContext } from "../Context/UserContext"
import SecondCard from "./SecondCard"

export default function ViewAll(){
    const {AllData} = useUserContext()
    return(
        <>
            <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
                AllData.map((singleUser)=> (
                    singleUser.myImages.map((singleimage)=>(
                        <SecondCard username={singleUser.username} 
                        keyvalue={singleimage.publicid} 
                        imagename={singleimage.imagename}
                        url={singleimage.url}
                        />
                    ))
                ))
            }
            </div>
            </div>
        </>
    )
}