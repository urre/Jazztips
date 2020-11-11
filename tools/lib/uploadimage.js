import cloudinary from 'cloudinary'
require('dotenv').config({ path: __dirname + `/../../.env` })

// Cloudinary settings, read secrets
cloudinary.config({
	cloud_name: process.env.CLOUDNAME,
	api_key: process.env.APIKEY,
	api_secret: process.env.APISECRET,
})

const UploadImage = async (album) => {
	cloudinary.v2.uploader.upload(album.image, function (error, result) {
		return result.secure_url
	})
}

export default UploadImage
