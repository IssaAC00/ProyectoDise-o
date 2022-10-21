import { Router } from 'express'
import { getPosts, createPost, getPost, deletePost, updatePost } from '../Controller/inspeccion'

const router = Router();

router.route('/')
    .get(getPosts)
    .post(createPost);

router.route('/:postId')
    .get(getPost)
    .delete(deletePost)
    .put(updatePost);

export default router;