import { Request, Response } from 'express'

import { MySQL } from '../BasesDatos/dbMysQL'
import { dutyManager, internalPerson, legalPerson } from '../interface/Post'

// Promise<Response | void>
export async function getDutyManagersInternal(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('select DM.DNIManager, DM.name, DM.email, DM.inspection, DM.conservation, DM.restauration '+ 
                                        ' from DutyManager as DM inner join InternalPerson as IP on DM.DNIManager = IP.DNIMANAGER;');
        res.json(posts);
    }
    catch (e) {
        console.log(e)
    }
}

export async function getDutyManagersLegal(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('select DM.DNIManager, DM.name, DM.email, DM.inspection, DM.conservation, DM.restauration,' +
                                        'LP.DNILegalManager, LP.nameLegal from DutyManager as DM inner join LegalPerson as LP '+ 
                                        'on DM.DNIManager = LP.DNIMANAGER;');
        res.json(posts);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createDutyManagerInternal(req: Request, res: Response) {
    try{
        const newDutyManager: dutyManager = req.body.General;
        const newInternal: internalPerson = req.body.Specific;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('INSERT INTO DutyManager SET ?', [newDutyManager]);
        await conn.query('INSERT INTO InternalPerson  SET ?', [newInternal]);
        res.json({
            message: 'New Duty Manager Created'
        });
    }catch(e){
        console.log(e);
    }
}

export async function createDutyManagerLegal(req: Request, res: Response) {
    try{
        const newDutyManager: dutyManager = req.body.General;
        const newLegal: legalPerson = req.body.Specific;
        console.log(newDutyManager);
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('INSERT INTO DutyManager SET ?', [newDutyManager]);
        await conn.query('INSERT INTO LegalPerson  SET ?', [newLegal]);
        res.json({
            message: 'New Duty Manager Created'
        });
    }catch(e){
        console.log(e);
    }
}

// revisar userMail
export async function getDutyManagerInternal(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('select DM.DNIManager, DM.name, DM.email, DM.inspection, DM.conservation, DM.restauration '+ 
                                        'from DutyManager as DM inner join InternalPerson as IP on DM.DNIManager = IP.DNIMANAGER '+
                                        'where DM.DNIManager = ?;', [id]);
        res.json(posts[0]);
    }catch(e){
        console.log(e);
    }
}

export async function getDutyManagerLegal(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('select DM.DNIManager, DM.name, DM.email, DM.inspection, DM.conservation, DM.restauration,' +
                                        'LP.DNILegalManager, LP.nameLegal from DutyManager as DM inner join LegalPerson as LP '+ 
                                        'on DM.DNIManager = LP.DNIMANAGER where DM.DNIManager = ?;', [id]);
        res.json(posts[0]);
    }catch(e){
        console.log(e);
    }
    
}

export async function deleteDutyManagerInternal(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await MySQL.getInstance().getConnect();
    await conn.query('DELETE FROM InternalPerson WHERE DNIMANAGER = ?;', [id]);
    await conn.query('DELETE FROM DutyManager WHERE DNIManager = ?;', [id]);
    res.json({
        message: 'Duty Manager deleted'
    });
}

export async function deleteDutyManagerLegal(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('DELETE FROM LegalPerson WHERE DNIMANAGER = ?;', [id]);
        await conn.query('DELETE FROM DutyManager WHERE DNIManager = ?;', [id]);
        res.json({
            message: 'Duty Manager deleted'
        });
    }catch(e){
        console.log(e);
    }
}

export async function updateDutyManagerInternal(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const updateDutyManager: dutyManager = req.body;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('UPDATE DutyManager set ? WHERE DNIManager = ?;', [updateDutyManager, id]);
        res.json({
            message: 'Duty Manager Updated'
        });
    }catch(e){
        console.log(e);
    }
}

export async function updateDutyManagerLegal(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const updateDutyManager: dutyManager = req.body.General;
        const updateLegal: dutyManager = req.body.Specific;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('UPDATE DutyManager set ? WHERE DNIManager = ?;', [updateDutyManager, id]);
        await conn.query('UPDATE LegalPerson set ? WHERE DNIMANAGER = ?;', [updateLegal, id]);
        res.json({
            message: 'Duty Manager Updated'
        });
    }catch(e){
        console.log(e);
    }
}

// inspeccion x INTERNAL person 
// Son todos
export async function getDutyManagerInternalXinspection (req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('SELECT Inspection.idInspection, State.description, DutyManager.name FROM Inspection INNER JOIN State ON Inspection.state= State.id INNER JOIN  DutyManager on Inspection.dutyManager= DutyManager.DNIManager '+
        'INNER JOIN InternalPerson on DutyManager.DNIManager= ? ',[id]+
        'ORDER BY State.id, DutyManager.DNIManager');
        res.json(posts[0]);
    }catch(e){
        console.log(e);
    }
    
}

// inpeccion x LEGAL person 
// Son todos
export async function getDutyManagerLegalXInspection(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('SELECT Inspection.idInspection, State.description, LegalPerson.nameLegal, LegalPerson.DNILegalManager FROM Inspection INNER JOIN State ON Inspection.state= State.id '+
        'INNER JOIN  LegalPerson on Inspection.dutyManager= ? ',[id] +
        'ORDER BY State.id, LegalPerson.DNIManager;');
        res.json(posts[0]);
    }catch(e){
        console.log(e);
    }
    
}

