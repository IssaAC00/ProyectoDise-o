import { Router } from 'express'
import { getElements, createElement, getElement, deleteElement, updateElement, ElementoXArea} from '../Controller/ElementBD'

const router = Router();

router.route('/Query')
    .get(ElementoXArea);

router.route('/')
    .get(getElements)
    .post(createElement);

router.route('/:postId')
    .get(getElement)
    .delete(deleteElement)
    .put(updateElement);

export default router;