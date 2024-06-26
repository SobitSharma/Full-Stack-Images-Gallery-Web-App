import dataBaseConnection from "./DataBase/index.js";
import express from "express"
import cors from "cors"
import { router } from "./Routes/routes.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { cloud_Configuration } from "./DataBase/cloudinary.middleware.js";
import morgan from "morgan"                                             

dotenv.config()
cloud_Configuration()
const app = express() 

app.use(cors({credentials:true, origin:['http://localhost:5173','http://127.0.0.1:5500']}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

dataBaseConnection().then((response)=> {
    app.listen(process.env.PORT, ()=> {
        console.log("Hey The server has started")
        console.log("The url is ", response)
    })
})

app.use('/gallery/v1', router)

export default app
