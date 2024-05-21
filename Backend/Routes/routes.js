import { Router, response } from "express"
import { Login, deleteUserImage, getAllUserImages, getUserImages, mainFile, registerUser, uploadImage, verifyJWT } from "../SourceFiles/Controllers.js"
import { upload } from "../Middlewares/multer.middleware.js"

const router = new Router()
router.route('/register').post(registerUser)
router.route('/login').post(Login)
router.route('/uploadFile').post(verifyJWT,upload.single('image') ,uploadImage)
router.route('/getUserImages').post(verifyJWT, getUserImages)
router.route('/getallusers').post(verifyJWT, getAllUserImages)
router.route('/deleteimage').post(verifyJWT, deleteUserImage)
export {router}