import { Request, Response } from 'express'

import { MySQL } from '../BasesDatos/dbMysQL'
import { inspection } from '../interface/Post'

// Promise<Response | void>
export async function getInspections(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('SELECT * FROM Inspection  ');
        res.json(posts);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createInspection(req: Request, res: Response) {
    const newInspection: inspection = req.body;
    const conn = await MySQL.getInstance().getConnect();
    await conn.query('INSERT INTO Inspection  SET ?', [newInspection]);
    res.json({
        message: 'New Inspection  Created'
    });
}
// revisar userMail
export async function getInspection(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await MySQL.getInstance().getConnect();
    const posts = await conn.query('SELECT * FROM Inspection WHERE idInspection = ?', [id]);
    res.json(posts[0]);
}

export async function deleteInspection(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await MySQL.getInstance().getConnect();
    await conn.query('DELETE FROM Inspection WHERE idInspection = ?', [id]);
    res.json({
        message: 'Inspection deleted'
    });
}

export async function updateInspection(req: Request, res: Response) {
    const id = req.params.postId;
    const updateInspection: inspection = req.body;
    const conn = await MySQL.getInstance().getConnect();
    await conn.query('UPDATE Inspection set ? WHERE idInspection = ?', [updateInspection, id]);
    res.json({
        message: 'Inspection Updated'
    });
}