import { Request, Response } from 'express'

import { connect } from '../BasesDatos/dbMysQL'
import { USUARIO } from '../interface/Post'

// Promise<Response | void> 
export async function getUsers(_req: Request, res: Response){
    try {
        const conn = await connect();
        const user = await conn.query('SELECT * FROM Usuario ');
        res.json(user);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createUser(req: Request, res: Response) {
    const newUser: USUARIO = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO USUARIO SET ?', [newUser]);
    res.json({
        message: 'New User Created'
    });
}

export async function getUser(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    const users = await conn.query('SELECT * FROM Usuario WHERE userMail = ?', [id]);
    res.json(users[0]);
}

export async function deleteUser(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    await conn.query('DELETE FROM Usuario WHERE userMail = ?', [id]);
    res.json({
        message: 'User deleted'
    });
}

export async function updateUser(req: Request, res: Response) {
    const id = req.params.postId;
    const updateUser: USUARIO = req.body;
    const conn = await connect();
    await conn.query('UPDATE Usuario set ? WHERE userMail = ?', [updateUser, id]);
    res.json({
        message: 'User Updated'
    });
}