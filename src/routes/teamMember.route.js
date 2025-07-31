import { Router } from "express";
import {addTeamMember, getMembers, removeTeamMember} from "../controllers/teamMember.controller.js"
const router = Router()
router.route("/addTeamMember").post(addTeamMember)
router.route("/removeTeamMember").post(removeTeamMember)
router.route("/getMember/:teamId").get(getMembers)

export default router