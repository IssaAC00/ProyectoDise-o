import { Request, Response } from 'express'

import { MySQL } from '../BasesDatos/dbMysQL'
import { state } from '../interface/Post'

// Promise<Response | void> 
export async function getStates(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('SELECT * FROM State ');
        res.json(posts);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createState(req: Request, res: Response) {
    try{
        const newState: state = req.body;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('INSERT INTO State SET ?', [newState]);
        res.json({
            message: 'New State Created'
        });
    }catch(e){
        console.log(e);
    }
}
// revisar userMail
export async function getState(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('SELECT * FROM State WHERE id = ?', [id]);
        res.json(posts[0]);
    }catch(e){
        console.log(e)
    }
}

export async function deleteState(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('DELETE FROM State WHERE id = ?', [id]);
        res.json({
            message: 'State deleted'
        });
    }catch(e){
        console.log(e)
    }
}

export async function updateState(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const updateState: state = req.body;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('UPDATE State set ? WHERE id = ?', [updateState, id]);
        res.json({
            message: 'State Updated'
        }); 
    }catch(e){
        console.log(e)
    }
}