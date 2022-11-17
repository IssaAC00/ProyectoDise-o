import { Router } from 'express'
import { getInspectionsArea, getInspectionsElement, createInspectionArea, createInspectionElement, 
        getInspectionArea,getInspectionElement, deleteInspectionArea, deleteInspectionElement,
        updateInspectionArea, updateInspectionElement, getInspectionXState} from '../Controller/InspectionBD'

const router = Router();

router.route('/QueryState')
    .get(getInspectionXState);

router.route('/Area')
    .get(getInspectionsArea)
    .post(createInspectionArea);

router.route('/Element')
    .get(getInspectionsElement)
    .post(createInspectionElement);

router.route('/Area/:postId')
    .get(getInspectionArea)
    .delete(deleteInspectionArea)
    .put(updateInspectionArea);

router.route('/Element/:postId')
    .get(getInspectionElement)
    .delete(deleteInspectionElement)
    .put(updateInspectionElement);

export default router;