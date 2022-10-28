import { Router } from 'express'
import { getSpolaiges, createSpolaige, getSpolaige, deleteSpolaige, updateSpolaige } from '../Controller/TypeSpolaigeBD'

const router = Router();

router.route('/')
    .get(getSpolaiges)
    .post(createSpolaige);

router.route('/:postId')
    .get(getSpolaige)
    .delete(deleteSpolaige)
    .put(updateSpolaige);

export default router;