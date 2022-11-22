import { Request, Response } from 'express'

import { MySQL } from '../BasesDatos/dbMysQL'
import { User } from '../interface/Post'

// Promise<Response | void> 
export async function getUsers(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        const user = await conn.query('SELECT * FROM Usuario where request = true');
        res.json(user);
    }
    catch (e) {
        console.log(e)
    }
}

export async function getRequests(_req: Request, res: Response){
    try {
        const conn = await MySQL.getInstance().getConnect();
        const user = await conn.query('SELECT * FROM Usuario where request = false');
        res.json(user);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createUser(req: Request, res: Response) {
    try{
        const newRequest: User = req.body;
        const conn = MySQL.getInstance().getConnect();
        console.log(newRequest);
        await conn.query('INSERT INTO Usuario SET ?', [newRequest]);
        res.json({
            message: 'New User Created'
        });
    }catch(e){
        console.log(e);
    }
}

export async function createRequest(req: Request, res: Response) {
    try{
        const newUser: User = req.body;
        const conn = MySQL.getInstance().getConnect();
        console.log(newUser);
        await conn.query('INSERT INTO Usuario SET ?', [newUser]);
        res.json({
            message: 'New User Created'
        });
    }catch(e){
        console.log(e);
    }
}

export async function getUser(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = MySQL.getInstance().getConnect();
        const users = await conn.query('SELECT * FROM Usuario WHERE userMail = ?', [id]);
        res.json(users[0]);
    }catch(e){
        console.log(e);
    }
}

export async function deleteUser(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const conn = MySQL.getInstance().getConnect();
        await conn.query('DELETE FROM Usuario WHERE userMail = ?', [id]);
        res.json({
            message: 'User deleted'
        });
    }catch(e){
        console.log(e);
    }
}

export async function updateUser(req: Request, res: Response) {
    try{
        const id = req.params.postId;
        const updateUser: User = req.body;
        const conn = MySQL.getInstance().getConnect();
        await conn.query('UPDATE Usuario set ? WHERE userMail = ?', [updateUser, id]);
        res.json({
            message: 'User Updated'
        });
    }catch(e){
        console.log(e);
    }
}