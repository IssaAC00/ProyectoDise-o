import { Request, Response } from 'express'

import { connect } from '../BasesDatos/dbMysQL'
import { Element } from '../interface/Post'

// Promise<Response | void> 
export async function getElements(_req: Request, res: Response){
    try {
        const conn = await connect();
        const elements = await conn.query('SELECT * FROM element ');
        res.json(elements);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createElement(req: Request, res: Response) {
    const newElement: Element = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO element SET ?', [newElement]);
    res.json({
        message: 'New Element Created'
    });
}
// revisar userMail
export async function getElement(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    const elements = await conn.query('SELECT * FROM element WHERE id = ?', [id]);
    res.json(elements[0]);
}

export async function deleteElement(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    await conn.query('DELETE FROM element WHERE id = ?', [id]);
    res.json({
        message: 'Element deleted'
    });
}

export async function updateElement(req: Request, res: Response) {
    const id = req.params.postId;
    const updateElement: Element = req.body;
    const conn = await connect();
    await conn.query('UPDATE element set ? WHERE id = ?', [updateElement, id]);
    res.json({
        message: 'Element Updated'
    });
}