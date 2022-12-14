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
// RETORNA LAS INSPECCIONES EN ORDEN POR EL ESTADO 
//Buena
export async function getInspectionXState(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('SELECT Inspection.idInspection, State.description FROM Inspection INNER JOIN State ON Inspection.state= State.id ORDER BY  State.id;');
        res.json(posts);
    }catch(e){
        console.log(e);
    }
}

//RETORNA LAS INSPECCIONES EN ORDEN POR EL ESTADO Y EL DUTY MANAGER

export async function getInspectionXStateXDuty(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('SELECT Inspection.idInspection, State.description, DutyManager.name FROM Inspection INNER JOIN State ON Inspection.state= State.id INNER JOIN  DutyManager on Inspection.dutyManager= DutyManager.DNIManager ORDER BY State.id, DutyManager.DNIManager;');
        res.json(posts[0]);
    }catch(e){
        console.log(e);
    }
}

// RETORNA LAS INSPECCIONES SEGUN EL INTERVALO DE TIEMPO 


export async function getInspectionXDate(req: Request, res: Response) {
    try{
        const DateInitial = req.params.postId;// cambiar 
        const DateFinal= req.params.postId;// cambiar
        const conn = await MySQL.getInstance().getConnect();
        const posts = await conn.query('SELECT Inspection.idInspection,Inspection.InitialDate,Inspection.endDate ,Inspection.deliveryDate,Inspection.dutyManager ,Inspection.pdf, Inspection.result,State.description  FROM Inspection '+
        'INNER JOIN State  ON Inspection.state= State.id AND Inspection.endDate>= ? and Inspection.InitialDate>= ?', [DateInitial,DateFinal]);

        res.json(posts[0]);
    }catch(e){
        console.log(e);
    }
}

// devuelve la cantidad de inspecciones x persona
export async function cantidadInspeccionXpersona(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('select count(*) from Inspection where Inspection.dutyManager= ?', [id]);
        
        res.json({
            message: 'Inspection deleted'
        });
    }catch(e){
        console.log(e);
    }
}

// devuelve la cantiad de inspecciones x estado 
export async function cantidadInspeccionXEstado(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        //const a : any;
        const conn = await MySQL.getInstance().getConnect();
        const query = await conn.query('SELECT COUNT(state) as count, state FROM Inspection GROUP BY state HAVING COUNT(state) > 0;');
        
        res.json(query);
    }catch(e){
        console.log(e);
    }
}








//select Area.idArea,Area.description,Area.ubication, Area.image 
//INNER JOIN inspeccionArea on inspeccionArea.inspeccion_id= Inspection.idInspection 
//INNER JOIN Area on inspeccionArea.idArea=Area.idArea where Inspection.dutyManager=2;