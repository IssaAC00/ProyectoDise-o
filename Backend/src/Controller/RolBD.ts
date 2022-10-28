import { Request, Response } from 'express'

import { MySQL } from '../BasesDatos/dbMysQL'
import { rol } from '../interface/Post'

// Promise<Response | void> 
export async function getRols(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('SELECT * FROM Rol  ');
        res.json(posts);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createRol(req: Request, res: Response) {
    try{
        const newRol : rol = req.body;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('INSERT INTO Rol  SET ?', [newRol]);
        res.json({
            message: 'New Rol Created'
        });
    }catch(e){
        console.log(e);
    }
}
// revisar userMail
export async function getRol(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('SELECT * FROM Rol  WHERE id = ?', [id]);
        res.json(posts[0]);
    }catch(e){
        console.log(e)
    }
}

export async function deleteRol(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('DELETE FROM Rol  WHERE id = ?', [id]);
        res.json({
            message: 'Rol deleted'
        });
    }catch(e){
        console.log(e)
    }
}

export async function updateRol(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const updateRol : rol = req.body;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('UPDATE Rol set ? WHERE id = ?', [updateRol, id]);
        res.json({
            message: 'Rol Updated'
        }); 
    }catch(e){
        console.log(e)
    }
}