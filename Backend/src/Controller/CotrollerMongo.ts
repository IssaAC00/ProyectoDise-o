import { Request, Response } from 'express'
import modeloPhoto from '../interface/Schema'


export async function getPhoto(_req: Request, res: Response){
   const photos =  await modeloPhoto.find();
    return res.json(photos);

}

export async function getPhotoByID(req: Request, res: Response) {
    const { id }= req.params;
    const photo = await modeloPhoto.findById(id);
    return res.json(photo);
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