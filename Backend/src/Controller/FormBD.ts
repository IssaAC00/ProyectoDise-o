import { Request, Response } from 'express'

import { MySQL } from '../BasesDatos/dbMysQL'
import { form } from '../interface/Post'

export async function getForm(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('SELECT * FROM Form ');
        res.json(posts);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createForm(req: Request, res: Response) {
    try{
        const newForm: form = req.body;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('INSERT INTO Form SET ?', [newForm]);
        res.json({
            message: 'New form Created'
        });
    }catch(e){
        console.log(e);
    }
}

export async function getFormbyid(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('SELECT * FROM Form WHERE idInspection = ?', [id]);
        res.json(posts[0]);
    }catch(e){
        console.log(e)
    }
}



export async function updateForm(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const updateForm: form = req.body;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('UPDATE Form set ? WHERE idInspection = ?', [updateForm, id]);
        res.json({
            message: 'Form Updated'
        }); 
    }catch(e){
        console.log(e)
    }
}