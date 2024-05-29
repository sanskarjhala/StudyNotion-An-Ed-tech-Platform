const cloudinary = require('cloudinary').v2;

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY_CLOUDINARY,
            api_secret:process.env.API_SECRET_CLOUDINARY,
        })
    } catch (error) {
        console.log(error)
    }
}