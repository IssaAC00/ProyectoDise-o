import { Request, Response } from 'express'

import { connect } from '../BasesDatos/dbMysQL'
import { spolaige } from '../interface/Post'

// Promise<Response | void> 
export async function getSpolaiges(_req: Request, res: Response){
    try {
        const conn = await connect();
        const spolaiges = await conn.query('SELECT * FROM spolaigearea ');
        res.json(spolaiges);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createSpolaige(req: Request, res: Response) {
    const newSpolaige: spolaige = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO spolaigearea SET ?', [newSpolaige]);
    res.json({
        message: 'New Spolaige Created'
    });
}
// revisar userMail
export async function getSpolaige(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    const spolaige = await conn.query('SELECT * FROM spolaigearea WHERE id = ?', [id]);
    res.json(spolaige[0]);
}

export async function deleteSpolaige(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    await conn.query('DELETE FROM spolaigearea WHERE id = ?', [id]);
    res.json({
        message: 'Spolaige deleted'
    });
}

export async function updateSpolaige(req: Request, res: Response) {
    const id = req.params.postId;
    const updateSpolaige: spolaige = req.body;
    const conn = await connect();
    await conn.query('UPDATE spolaigearea set ? WHERE id = ?', [updateSpolaige, id]);
    res.json({
        message: 'Spolaige Updated'
    });
}