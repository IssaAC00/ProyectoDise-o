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
    try{
        const newSpolaige: Spolaige = req.body;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('INSERT INTO Spolaige SET ?', [newSpolaige]);
        res.json({
            message: 'New Spolaige Created'
        });
    }catch(e){
        console.log(e);
    }
}
// revisar userMail
export async function getSpolaige(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        const spolaige = await conn.query('SELECT * FROM Spolaige WHERE id = ?', [id]);
        res.json(spolaige[0]);
    }catch(e){
        console.log(e);
    }

}

export async function deleteSpolaige(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('DELETE FROM Spolaige WHERE id = ?', [id]);
        res.json({
            message: 'Spolaige deleted'
        });
    }catch(e){
        console.log(e);
    }
    
}

export async function updateSpolaige(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const updateSpolaige: Spolaige = req.body;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('UPDATE Spolaige set ? WHERE id = ?', [updateSpolaige, id]);
        res.json({
            message: 'Spolaige Updated'
        });
    }catch(e){
        console.log(e);
    }

}


export async function AgentesDeterioro(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        //Le falta agrupar clasificacción y ordernar por ALFABETICAMENTE
        const spolaiges = await conn.query('select Spolaige.description, TypeSpolaige.id  from Spolaige INNER JOIN  TypeSpolaige ON Spolaige.type_typespolaige= TypeSpolaige.id order by TypeSpolaige.id');
        res.json(spolaiges);
    }
    catch (e) {
        console.log(e)
    }
}