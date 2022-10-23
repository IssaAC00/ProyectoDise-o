import { Request, Response } from 'express'

import { connect } from '../BasesDatos/dbMysQL'
import { floortype } from '../interface/Post'

// Promise<Response | void> 
export async function getFloorTypes(_req: Request, res: Response){
    try {
        const conn = await connect();
        const floorType = await conn.query('SELECT * FROM floortype ');
        res.json(floorType);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createFloorType(req: Request, res: Response) {
    const newFloorType: floortype = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO floortype SET ?', [newFloorType]);
    res.json({
        message: 'New Floor Type Created'
    });
}
// revisar userMail
export async function getFloorType(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    const floorType = await conn.query('SELECT * FROM floortype WHERE id = ?', [id]);
    res.json(floorType[0]);
}

export async function deleteFloorType(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    await conn.query('DELETE FROM floortype WHERE id = ?', [id]);
    res.json({
        message: 'Floor Type deleted'
    });
}

export async function updateArea(req: Request, res: Response) {
    const id = req.params.postId;
    const updateFloorType: floortype = req.body;
    const conn = await connect();
    await conn.query('UPDATE floortype set ? WHERE id = ?', [updateFloorType, id]);
    res.json({
        message: 'Area Updated'
    });
}