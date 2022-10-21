import { Request, Response } from 'express'

import { connect } from '../BasesDatos/dbMysQL'
import { inspeccion } from '../interface/Post'

export async function getPosts( res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM inspeccion ');
        res.json(posts[0]);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createPost(req: Request, res: Response) {
    const newPost: inspeccion = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO inspeccion SET ?', [newPost]);
    res.json({
        message: 'New Post Created'
    });
}

export async function getPost(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    const posts = await conn.query('SELECT * FROM inspeccion WHERE id = ?', [id]);
    res.json(posts[0]);
}

export async function deletePost(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    await conn.query('DELETE FROM inspeccion WHERE id = ?', [id]);
    res.json({
        message: 'Post deleted'
    });
}

export async function updatePost(req: Request, res: Response) {
    const id = req.params.postId;
    const updatePost: inspeccion = req.body;
    const conn = await connect();
    await conn.query('UPDATE inspeccion set ? WHERE id = ?', [updatePost, id]);
    res.json({
        message: 'Post Updated'
    });
}