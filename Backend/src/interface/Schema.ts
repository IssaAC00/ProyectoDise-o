import { Schema , model, Document } from 'mongoose';

const schema = new Schema({
    title : String ,
    imgpath : String 

})

interface Imagen extends Document{
    title: string;
    imgpath : string;

}

export default model<Imagen> ('Imagenes', schema);