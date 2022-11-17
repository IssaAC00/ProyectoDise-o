import { Request, Response } from 'express'
import modeloPhoto from '../interface/Schema'


export function getPhoto(req: Request, res: Response){



}


export async function createphoto(req: Request, res: Response){
    const { title } = req.body;
    console.log(req.file);
    const newPhoto = {
        title : title ,
        imgpath : req.file?.path 
    };

    const photo =  new modeloPhoto(newPhoto);
    await photo.save();
   
    return res.json({
        message: 'Photo created successfully',
        photo
    });
}