import { Request, Response } from 'express'

import { MySQL } from '../BasesDatos/dbMysQL'
import { inspection, inspeccionArea, inspeccionElemento } from '../interface/Post'

// Promise<Response | void>
export async function getInspectionsArea(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('select I.idInspection, I.InitialDate, I.endDate, '+
                                        'I.deliveryDate, I.pdf, I.dutyManager, I.state, I.result, A.idArea '+
                                        'from Inspection as I inner join inspeccionArea as IA on I.idInspection '+
                                        '= IA.inspeccion_id inner join Area as A on IA.idArea = A.idArea; ');
        res.json(posts);
    }
    catch (e) {
        console.log(e)
    }
}

export async function getInspectionsElement(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('select I.idInspection, I.InitialDate, I.endDate, '+
                                        'I.deliveryDate, I.pdf, I.dutyManager, I.state, I.result, E.idElement '+
                                        'from Inspection as I inner join inspeccionElemento as IE on I.idInspection '+
                                        '= IE.inspeccion_id inner join Element as E on IE.idElement = E.idElement; ');
        res.json(posts);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createInspectionArea(req: Request, res: Response) {
    try{
        const newInspection: inspection = req.body.General;
        const addArea: inspeccionArea = req.body.Specific;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('INSERT INTO Inspection  SET ?', [newInspection]);
        await conn.query('INSERT INTO inspeccionArea  SET ?', [addArea]);
        res.json({
            message: 'New Inspection  Created'
        });
    }catch(e){
        console.log(e);
    }
}

export async function createInspectionElement(req: Request, res: Response) {
    try{
        const newInspection: inspection = req.body.General;
        const addElement: inspeccionElemento = req.body.Specific;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('INSERT INTO Inspection  SET ?', [newInspection]);
        await conn.query('INSERT INTO inspeccionElemento  SET ?', [addElement]);
        res.json({
            message: 'New Inspection  Created'
        });
    }catch(e){
        console.log(e);
    }
}
// revisar userMail
export async function getInspectionArea(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('select I.idInspection, I.InitialDate, I.endDate, '+
                                        'I.deliveryDate, I.pdf, I.dutyManager, I.state, I.result, A.idArea '+
                                        'from Inspection as I inner join inspeccionArea as IA on I.idInspection '+
                                        '= IA.inspeccion_id inner join Area as A on IA.idArea = A.idArea '+
                                        'where I.idInspection = ?; ', [id]);
        res.json(posts[0]);
    }catch(e){
        console.log(e);
    }
}

export async function getInspectionElement(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('select I.idInspection, I.InitialDate, I.endDate, '+
                                        'I.deliveryDate, I.pdf, I.dutyManager, I.state, I.result, E.idElement '+
                                        'from Inspection as I inner join inspeccionElemento as IE on I.idInspection '+
                                        '= IE.inspeccion_id inner join Element as E on IE.idElement = E.idElement '+
                                        'where I.idInspection = ?; ', [id]);
        res.json(posts[0]);
    }catch(e){
        console.log(e);
    }
}

export async function deleteInspectionArea(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('DELETE FROM inspeccionArea WHERE inspeccion_id= ?', [id]);
        await conn.query('DELETE FROM Inspection WHERE idInspection = ?', [id]);
        res.json({
            message: 'Inspection deleted'
        });
    }catch(e){
        console.log(e);
    }
}

export async function deleteInspectionElement(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('DELETE FROM inspeccionElemento WHERE inspeccion_id= ?', [id]);
        await conn.query('DELETE FROM Inspection WHERE idInspection = ?', [id]);
        res.json({
            message: 'Inspection deleted'
        });
    }catch(e){
        console.log(e);
    }
}

export async function updateInspectionArea(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const updateInspection: inspection = req.body.General;
        const updateArea: inspeccionArea = req.body.Specific;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('UPDATE Inspection set ? WHERE idInspection = ?', [updateInspection, id]);
        await conn.query('UPDATE inspeccionArea set ? WHERE inspeccion_id = ?', [updateArea, id]);
        res.json({
            message: 'Inspection Updated'
        });
    }catch(e){
        console.log(e);
    }
}

export async function updateInspectionElement(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const updateInspection: inspection = req.body.General;
        const updateElement: inspeccionElemento = req.body.Specific;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('UPDATE Inspection set ? WHERE idInspection = ?', [updateInspection, id]);
        await conn.query('UPDATE inspeccionElemento set ? WHERE inspeccion_id = ?', [updateElement, id]);
        res.json({
            message: 'Inspection Updated'
        });
    }catch(e){
        console.log(e);
    }
}