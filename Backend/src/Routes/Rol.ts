import { Router } from 'express'
import { getRols, createRol, getRol, deleteRol, updateRol } from '../Controller/RolBD'

const router = Router();

router.route('/')
    .get(getRols)
    .post(createRol);

router.route('/:postId')
    .get(getRol)
    .delete(deleteRol)
    .put(updateRol);

export default router;