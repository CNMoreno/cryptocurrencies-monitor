import {Router} from "express";
import {getUser, getUsers, updateUser, deleteUser, createUser} from "../controllers/Users";

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;