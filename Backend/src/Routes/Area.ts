import { Router } from 'express'
import { getAreas, createArea, getArea, deleteArea, updateArea } from '../Controller/AreaBD'

const router = Router();

router.route('/')
    .get(getAreas)
    .post(createArea);

router.route('/:postId')
    .get(getArea)
    .delete(deleteArea)
    .put(updateArea);

export default router;