import { Request, Response } from 'express'

import { connect } from '../BasesDatos/dbMysQL'
import { AREA } from '../interface/Post'

export async function getPosts( res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM Area ');
        res.json(posts[0]);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createPost(req: Request, res: Response) {
    const newPost: AREA = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO Area SET ?', [newPost]);
    res.json({
        message: 'New Post Created'
    });
}

export async function getPost(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    const posts = await conn.query('SELECT * FROM Area WHERE id = ?', [id]);
    res.json(posts[0]);
}

export async function deletePost(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    await conn.query('DELETE FROM Area WHERE id = ?', [id]);
    res.json({
        message: 'Post deleted'
    });
}

export async function updatePost(req: Request, res: Response) {
    const id = req.params.postId;
    const updatePost: AREA = req.body;
    const conn = await connect();
    await conn.query('UPDATE Area set ? WHERE id = ?', [updatePost, id]);
    res.json({
        message: 'Post Updated'
    });
}