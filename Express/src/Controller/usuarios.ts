import { Request, Response } from 'express'

import { connect } from '../BasesDatos/dbMysQL'
import { USUARIO } from '../interface/Post'

export async function getPosts( req: Request,  res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM Usuario ');
        res.json(posts)
    }
    catch (e) {
        console.log(e)
    }
}

export async function createPost(req: Request, res: Response) {
    const newPost: USUARIO = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO USUARIO SET ?', [newPost]);
    res.json({
        message: 'New Post Created'
    });
}

export async function getPost(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    const posts = await conn.query('SELECT * FROM Usuario WHERE userMail = ?', [id]);
    res.json(posts[0]);
}

export async function deletePost(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    await conn.query('DELETE FROM USUARIO WHERE userMail = ?', [id]);
    res.json({
        message: 'Post deleted'
    });
}

export async function updatePost(req: Request, res: Response) {
    const id = req.params.postId;
    const updatePost: USUARIO = req.body;
    const conn = await connect();
    await conn.query('UPDATE USUARIO set ? WHERE userMail = ?', [updatePost, id]);
    res.json({
        message: 'Post Updated'
    });
}