import { Request, Response } from 'express'

import { MySQL } from '../BasesDatos/dbMysQL'
import { dutyManager, internalPerson, legalPerson } from '../interface/Post'

// Promise<Response | void>
export async function getDutyManagers(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('SELECT * FROM DutyManager ');
        res.json(posts);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createDutyManagerInternal(req: Request, res: Response) {
    const newDutyManager: dutyManager = {"DNIManager": req.body.DNIManager,
                                        "name": req.body.name,
                                        "email": req.body.email,
                                        "inspection" :req.body.inspection,
                                        "restauration" :req.body.restauration,
                                        "conservation" :req.body.conservation};
    const newInternal: internalPerson = {"DNIManager": req.body.DNIManager};
    const conn = await MySQL.getInstance().getConnect();
    await conn.query('INSERT INTO DutyManager SET ?', [newDutyManager]);
    await conn.query('INSERT INTO InternalPerson  SET ?', [newInternal]);
    res.json({
        message: 'New Duty Manager Created'
    });
}

export async function createDutyManagerLegal(req: Request, res: Response) {
    const newDutyManager: dutyManager = {"DNIManager": req.body.DNIManager,
                                        "name": req.body.name,
                                        "email": req.body.email,
                                        "inspection" :req.body.inspection,
                                        "restauration" :req.body.restauration,
                                        "conservation" :req.body.conservation};
    const newLegal: legalPerson = {"DNIManager": req.body.DNIManager,
                                    "DNILegalManager": req.body.DNILegalManager,
                                    "nameLegal": req.body.nameLegal};
    console.log(newDutyManager);
    const conn = await MySQL.getInstance().getConnect();
    await conn.query('INSERT INTO DutyManager SET ?', [newDutyManager]);
    await conn.query('INSERT INTO LegalPerson  SET ?', [newLegal]);
    res.json({
        message: 'New Duty Manager Created'
    });
}

// revisar userMail
export async function getDutyManager(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await MySQL.getInstance().getConnect();
    const posts = await conn.query('SELECT * FROM DutyManager WHERE DNIManager = ?', [id]);
    res.json(posts[0]);
}

export async function deleteDutyManager(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await MySQL.getInstance().getConnect();
    await conn.query('DELETE FROM DutyManager WHERE DNIManager = ?', [id]);
    res.json({
        message: 'Duty Manager deleted'
    });
}

export async function updateDutyManager(req: Request, res: Response) {
    const id = req.params.postId;
    const updateDutyManager: dutyManager = req.body;
    const conn = await MySQL.getInstance().getConnect();
    await conn.query('UPDATE DutyManager set ? WHERE DNIManager = ?', [updateDutyManager, id]);
    res.json({
        message: 'Duty Manager Updated'
    });
}