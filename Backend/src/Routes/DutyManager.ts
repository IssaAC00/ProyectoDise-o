import { Router } from 'express'
import { getDutyManagersInternal, getDutyManagersLegal, createDutyManagerInternal, createDutyManagerLegal, 
        getDutyManagerInternal, getDutyManagerLegal, deleteDutyManagerInternal, updateDutyManagerInternal,
        deleteDutyManagerLegal, updateDutyManagerLegal } from '../Controller/DutyManagerBD'

const router = Router();
    
    
router.route('/internal')
    .get(getDutyManagersInternal)
    .post(createDutyManagerInternal);

router.route('/legal')
    .get(getDutyManagersLegal)
    .post(createDutyManagerLegal);

router.route('/internal/:postId')
    .get(getDutyManagerInternal)
    .delete(deleteDutyManagerInternal)
    .put(updateDutyManagerInternal);

router.route('/legal/:postId')
    .get(getDutyManagerLegal)
    .delete(deleteDutyManagerLegal)
    .put(updateDutyManagerLegal);

export default router;