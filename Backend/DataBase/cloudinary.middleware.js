import cloudinary from 'cloudinary';


function cloud_Configuration(){
    cloudinary.config({ 
        cloud_name: process.env.Cloudname, 
        api_key: process.env.Cloudkey, 
        api_secret: process.env.Cloudsecret
    });
}

const cloudupload = async(path)=> {
    try {
        const uploadresult = await cloudinary.uploader.upload(path)
        console.log(uploadresult)
        return uploadresult
    } catch (error) {
        console.log(error)
        console.log("Internal Server Error :: Cloudinary")
    }
}

async function DeleteImage(publicId){
    try {
        const result = await cloudinary.v2.uploader.destroy(publicId, {resource_type:'image',type:'upload'})
        return result
    } catch (error) {
        console.log("Error in deleting The Image")
        return "error"
    }
}

export {cloudupload, cloud_Configuration, DeleteImage}