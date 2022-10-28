import { Router } from 'express'
import { getElements, createElement, getElement, deleteElement, updateElement } from '../Controller/ElementBD'

const router = Router();

router.route('/')
    .get(getElements)
    .post(createElement);

router.route('/:postId')
    .get(getElement)
    .delete(deleteElement)
    .put(updateElement);

export default router;