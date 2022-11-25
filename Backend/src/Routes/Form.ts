import { Router } from 'express'
import { getFormbyid, createForm , getForm , updateForm } from '../Controller/FormBD'

const router = Router();

router.route('/form')
    .get(getForm)
    .post(createForm);

router.route('/form/:postId')
    .get(getFormbyid)
    .put(updateForm);

export default router;