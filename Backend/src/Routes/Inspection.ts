import { Router } from 'express'
import { getInspections, createInspection, getInspection, deleteInspection, updateInspection } from '../Controller/InspectionBD'

const router = Router();

router.route('/')
    .get(getInspections)
    .post(createInspection);

router.route('/:postId')
    .get(getInspection)
    .delete(deleteInspection)
    .put(updateInspection);

export default router;