import {Router} from 'express'
import upload from '../middlewares/upload.js';
import { uploadImage } from '../controllers/uploadController.js';

const uploadRouter = Router()

uploadRouter.post('/', upload.single("image"), uploadImage)

export default uploadRouter