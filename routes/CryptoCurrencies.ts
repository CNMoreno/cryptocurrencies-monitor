import {Router} from "express";
import {getCryptoCurrencies} from "../controllers/CryptoCurrencies";

const router = Router();

router.get('/', getCryptoCurrencies);

export default router;