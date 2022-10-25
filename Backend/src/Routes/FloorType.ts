import { Router } from 'express'
import { getFloorTypes, createFloorType, getFloorType, deleteFloorType, updateFloorType } from '../Controller/FloorTypeBD'

const router = Router();

router.route('/')
    .get(getFloorTypes)
    .post(createFloorType);

router.route('/:postId')
    .get(getFloorType)
    .delete(deleteFloorType)
    .put(updateFloorType);

export default router;