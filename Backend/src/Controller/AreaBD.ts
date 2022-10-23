import { Request, Response } from 'express'

import { connect } from '../BasesDatos/dbMysQL'
import { AREA } from '../interface/Post'

// Promise<Response | void> 
export async function getAreas(_req: Request, res: Response){
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM Area ');
        res.json(posts);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createArea(req: Request, res: Response) {
    const newArea: AREA = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO Area SET ?', [newArea]);
    res.json({
        message: 'New Area Created'
    });
}
// revisar userMail
export async function getArea(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    const posts = await conn.query('SELECT * FROM Area WHERE id = ?', [id]);
    res.json(posts[0]);
}

export async function deleteArea(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    await conn.query('DELETE FROM Area WHERE id = ?', [id]);
    res.json({
        message: 'Area deleted'
    });
}

export async function updateArea(req: Request, res: Response) {
    const id = req.params.postId;
    const updateArea: AREA = req.body;
    const conn = await connect();
    await conn.query('UPDATE Area set ? WHERE userMail = ?', [updateArea, id]);
    res.json({
        message: 'Area Updated'
    });
}