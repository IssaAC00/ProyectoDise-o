import { Request, Response } from 'express'

import { MySQL } from '../BasesDatos/dbMysQL'
import { Spolaige } from '../interface/Post'

// Promise<Response | void> 
export async function getSpolaiges(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        const spolaiges = await conn.query('SELECT * FROM Spolaige ');
        res.json(spolaiges);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createSpolaige(req: Request, res: Response) {
    const newSpolaige: Spolaige = req.body;
    const conn = await MySQL.getInstance().getConnect();
    await conn.query('INSERT INTO Spolaige SET ?', [newSpolaige]);
    res.json({
        message: 'New Spolaige Created'
    });
}
// revisar userMail
export async function getSpolaige(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await MySQL.getInstance().getConnect();
    const spolaige = await conn.query('SELECT * FROM Spolaige WHERE id = ?', [id]);
    res.json(spolaige[0]);
}

export async function deleteSpolaige(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await MySQL.getInstance().getConnect();
    await conn.query('DELETE FROM Spolaige WHERE id = ?', [id]);
    res.json({
        message: 'Spolaige deleted'
    });
}

export async function updateSpolaige(req: Request, res: Response) {
    const id = req.params.postId;
    const updateSpolaige: Spolaige = req.body;
    const conn = await MySQL.getInstance().getConnect();
    await conn.query('UPDATE Spolaige set ? WHERE id = ?', [updateSpolaige, id]);
    res.json({
        message: 'Spolaige Updated'
    });
}