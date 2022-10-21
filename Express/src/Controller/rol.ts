import { Request, Response } from 'express'

import { connect } from '../BasesDatos/dbMysQL'
import { rol } from '../interface/Post'

export async function getPosts( res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM rol ');
        res.json(posts[0]);
    }
    catch (e) {
        console.log(e)
    }
}



export async function getPost(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    const posts = await conn.query('SELECT * FROM rol WHERE id = ?', [id]);
    res.json(posts[0]);
}



export async function createPost(req: Request, res: Response) {
    const newPost: rol = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO rol SET ?', [newPost]);
    res.json({
        message: 'New Post Created'
    });
}




export async function deletePost(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    await conn.query('DELETE FROM rol WHERE id = ?', [id]);
    res.json({
        message: 'Post deleted'
    });
}

export async function updatePost(req: Request, res: Response) {
    const id = req.params.postId;
    const updatePost: rol = req.body;
    const conn = await connect();
    await conn.query('UPDATE rol set ? WHERE id = ?', [updatePost, id]);
    res.json({
        message: 'Post Updated'
    });
}