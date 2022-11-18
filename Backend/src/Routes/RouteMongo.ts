import { Router } from 'express'
const router = Router();
import {createphoto , getPhoto, getPhotoByID} from '../Controller/CotrollerMongo'
import multer from '../lib/multer'


router.route('/photo')
    .post(multer.single('image'), createphoto)
    .get(getPhoto)

    router.route('/photo/:id')
    .get(getPhotoByID)


export default router;