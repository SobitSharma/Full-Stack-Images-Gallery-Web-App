import jwt from "jsonwebtoken"
import { User } from "../Models/user.model.js"
import { DeleteImage, cloudupload } from "../DataBase/cloudinary.middleware.js"


const generateAccessToken = (payload) => {
    const accesstoken = jwt.sign(payload, process.env.SECRETKEY, {expiresIn:'10m'})
    return {accesstoken}
}

const verifyJWT = async(req,res, next)=> {
    const accesstoken = req.cookies?.accesstoken?.accesstoken
    console.log(accesstoken)
    
    if(!accesstoken){
        return res.status(401).json({message:"You are an UnAuthorized User"})
    }

    try {
        const verification = jwt.verify(accesstoken, process.env.SECRETKEY)
        req.user = {username:verification.username, id:verification.id}
        return next()

    } catch (error) {
        if(error == "TokenExpiredError"){
            return res.status(200).json({message:"Your Session has Expired"})
        }
        return res.status(301).json("Please Login Again")
    }
    
}

const registerUser = async(req,res)=> {
    const {username, password} = req.body
    if(!username || !password){
        return res.status(301).json({data:'', message:"All Fields should be filled"})
    }
    const user = new User({username, password})
    try {
        await user.save()
    } catch (error) {
        if(error.errorResponse.code == 11000){
            return res.status(200).json("User with this username already exists")
        }
        return res.status(200).json({message:"Error in storing the user"})
    }
    const {accesstoken} = generateAccessToken({username, id:user._id})
    return res.status(200).cookie('accesstoken',accesstoken).json({message:"User is Registered SuccessFully"})
}

const Login = async(req, res)=> {
    const {username, password} = req.body
    if(!username || !password){
        return res.status(401).json({message:"All fields should be filled"})
    }

    const user = await User.findOne({username})
    if(!user){
        return res.status(401).json({message:"Invalid crendentials"})
    }
    
    if(!(user.password === password)){
        return res.status(401).json({message:"Password is In correct"})
    }

    const accesstoken = generateAccessToken({username, id:user._id})
    return res.status(200).cookie('accesstoken', accesstoken).json({message:"User is Loggged in SuccessFully"})

}

const uploadImage = async(req, res) => {
    const filePath = req.file?.path 
    const uploadonCloud = await cloudupload(filePath)
    const user = await User.findById(req.user?.id)
    user.myImages.push({url:uploadonCloud.url, publicid:uploadonCloud.public_id, resourcetype:uploadonCloud.resource_type, imagename:uploadonCloud.original_filename})
    await user.save()
    return res.status(200).json({message:"Your upload SuccessFull"})
}

const getUserImages = async(req, res) => {
    const user = await User.findById(req.user?.id)
    return res.status(200).json({data:user.myImages})
}

const getAllUserImages = async(req, res) => {
    const user = await User.find({}, {myImages:1,username:1, _id:0})
    console.log(user)
    return res.status(200).json({message:"Data fetched SuccessFully", Data:user})
}

const deleteUserImage = async(req, res)=> {
    const {publicid} =  req.body
    const result = await DeleteImage(publicid)
    if(!(result.result=="ok")){
        return res.status(301).json({message:"There is an Error in Deleting the File"})
    }

    const user = await User.findById(req.user?.id)

    user.myImages = user.myImages.filter(image => image.publicid !== publicid)
    await user.save()
    return res.status(200).json({message:"The Data is Deleted"})
}


export {
    registerUser,
    Login,
    verifyJWT,
    uploadImage,
    getUserImages,
    getAllUserImages,
    deleteUserImage
}