import mongoose from "mongoose"

export default async function dataBaseConnection(){
    try {
        const connection = await mongoose.connect(`${process.env.DBURL}/${process.env.DBNAME}`)
        return connection.connection.host

    } catch (error) {
        console.log(error);
        console.log("Error In Connecting To the DataBase")
    }
}