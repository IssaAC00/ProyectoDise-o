import { Request, Response } from 'express'

import { connect } from '../BasesDatos/dbMysQL'
import { Floortype } from '../interface/Post'

// Promise<Response | void> 
export async function getFloorTypes(_req: Request, res: Response){
    try {
        const conn = await connect();
        const floorType = await conn.query('SELECT * FROM FloorType ');
        res.json(floorType);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createFloorType(req: Request, res: Response) {
    const newFloorType: Floortype = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO FloorType SET ?', [newFloorType]);
    res.json({
        message: 'New Floor Type Created'
    });
}
// revisar userMail
export async function getFloorType(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    const floorType = await conn.query('SELECT * FROM FloorType WHERE id = ?', [id]);
    res.json(floorType[0]);
}

export async function deleteFloorType(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    await conn.query('DELETE FROM FloorType WHERE id = ?', [id]);
    res.json({
        message: 'Floor Type deleted'
    });
}

export async function updateFloorType(req: Request, res: Response) {
    const id = req.params.postId;
    const updateFloorType: Floortype = req.body;
    const conn = await connect();
    await conn.query('UPDATE FloorType set ? WHERE id = ?', [updateFloorType, id]);
    res.json({
        message: 'Floor type Updated'
    });
}