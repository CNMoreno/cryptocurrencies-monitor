import {Router} from "express";
import {createCurrencyUser, getUserCryptos} from "../controllers/CryptosUser";

const router = Router();

router.get('/', getUserCryptos);
router.post('/', createCurrencyUser);

export default router;