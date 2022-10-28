import { Router } from 'express'
import { getStates, createState, getState, deleteState, updateState } from '../Controller/StateBD'

const router = Router();

router.route('/')
    .get(getStates)
    .post(createState);

router.route('/:postId')
    .get(getState)
    .delete(deleteState)
    .put(updateState);

export default router;