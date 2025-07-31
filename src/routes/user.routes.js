import {Router} from "express"
import { getAllUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/getUsers").get(getAllUser)
export default router