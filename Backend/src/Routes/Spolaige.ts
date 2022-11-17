import { Router } from 'express'
import { getSpolaiges, createSpolaige, getSpolaige, deleteSpolaige, updateSpolaige, AgentesDeterioro} from '../Controller/SpolaigeBD'

const router = Router();

router.route('/Query')
    .get(AgentesDeterioro);

router.route('/')
    .get(getSpolaiges)
    .post(createSpolaige);

router.route('/:postId')
    .get(getSpolaige)
    .delete(deleteSpolaige)
    .put(updateSpolaige);

export default router;