import { Router } from 'express'
import { getDutyManagers, createDutyManagerInternal, createDutyManagerLegal, getDutyManager, deleteDutyManager, updateDutyManager } from '../Controller/DutyManagerBD'

const router = Router();

router.route('/')
    .get(getDutyManagers);
    
    
router.route('/internal')
    .post(createDutyManagerInternal);

router.route('/legal')
    .post(createDutyManagerLegal);

router.route('/:postId')
    .get(getDutyManager)
    .delete(deleteDutyManager)
    .put(updateDutyManager);

export default router;