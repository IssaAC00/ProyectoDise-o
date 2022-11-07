import { Request, Response } from 'express'

import { MySQL } from '../BasesDatos/dbMysQL'
import { Element } from '../interface/Post'

// Promise<Response | void> 
export async function getElements(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        const elements = await conn.query('SELECT * FROM Element ');
        res.json(elements);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createElement(req: Request, res: Response) {
    try{
        const newElement: Element = req.body;
        const conn = await await MySQL.getInstance().getConnect();
        await conn.query('INSERT INTO Element SET ?', [newElement]);
        res.json({
            message: 'New Element Created'
        });
    }catch(e){
        console.log(e);
    }
    
}
// revisar userMail
export async function getElement(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        const elements = await conn.query('SELECT * FROM Element WHERE idElement = ?', [id]);
        res.json(elements[0]);
    }catch(e){
        console.log(e);
    }
    
}

export async function deleteElement(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('DELETE FROM Element WHERE idElement = ?', [id]);
        res.json({
            message: 'Element deleted'
        });
    }catch(e){
        console.log(e);
    }
    
}

export async function updateElement(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const updateElement: Element = req.body;
        const conn = await MySQL.getInstance().getConnect();
        await conn.query('UPDATE Element set ? WHERE idElement = ?', [updateElement, id]);
        res.json({
            message: 'Element Updated'
        });
    }catch(e){
        console.log(e);
    }
    
}


export async function ElementoXArea(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = await MySQL.getInstance().getConnect();
        const elements = await conn.query('select * from Element where Element.areaID= ?', [id]);
        res.json(elements[0]);
    }catch(e){
        console.log(e);
    }
    //'select Area.idArea, Element.idElement, Element.description, Element.ubication from Area INNER JOIN Element on Area.idArea =?', [id]; 

}