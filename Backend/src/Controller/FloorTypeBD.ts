import { Request, Response } from 'express'

import { MySQL } from '../BasesDatos/dbMysQL'
import { Floortype } from '../interface/Post'

// Promise<Response | void> 
export async function getFloorTypes(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        const floorType = await conn.query('SELECT * FROM FloorType ');
        res.json(floorType);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createFloorType(req: Request, res: Response) {
    try{
        const newFloorType: Floortype = req.body;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('INSERT INTO FloorType SET ?', [newFloorType]);
        res.json({
            message: 'New Floor Type Created'
        });
    }catch(e){
        console.log(e);
    }
    
}
// revisar userMail
export async function getFloorType(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        const floorType = await conn.query('SELECT * FROM FloorType WHERE id = ?', [id]);
        res.json(floorType[0]);
    }catch(e){
        console.log(e);
    }
    
}

export async function deleteFloorType(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('DELETE FROM FloorType WHERE id = ?', [id]);
        res.json({
            message: 'Floor Type deleted'
        });
    }catch(e){
        console.log(e);
    }
}

export async function updateFloorType(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const updateFloorType: Floortype = req.body;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('UPDATE FloorType set ? WHERE id = ?', [updateFloorType, id]);
        res.json({
            message: 'Floor type Updated'
        });
    }catch(e){
        console.log(e);
    }
}