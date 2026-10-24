import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDir = "uploads"

const ensureUploadDirectory = () => {
    try {
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir, { recursive: true})
        }
    } catch (error) {
        console.error("Upload directory error: ", error.message);
        throw error
    }
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        try {
            ensureUploadDirectory();
            callback(null, uploadDir)
        } catch (error) {
            callback(error)
        }
    },
    filename: (req, file, callback) => {
        try {
            callback(null, Date.now() + path.extname(file.originalname));
        } catch (error) {
            callback9error
        }
    }
})

const upload = multer({ storage })

export default upload