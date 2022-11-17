import { Router } from 'express'
const router = Router();
import {createphoto , getPhoto} from '../Controller/CotrollerMongo'
import multer from '../lib/multer'


router.route('/photo')
    .post(multer.single('image'), createphoto)
    .get(getPhoto)



export default router;