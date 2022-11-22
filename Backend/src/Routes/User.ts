import { Router } from 'express'
import { getUsers, createUser, getUser, deleteUser, updateUser, getRequests, createRequest} from '../Controller/UserBD'

const router = Router();

router.route("/request")
    .get(getRequests)
    .post(createRequest);

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:postId')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser);

export default router;