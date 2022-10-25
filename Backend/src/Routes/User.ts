import { Router } from 'express'
import { getUsers, createUser, getUser, deleteUser, updateUser } from '../Controller/UserBD'

const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:postId')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser);

export default router;