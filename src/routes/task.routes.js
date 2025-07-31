import { Router } from "express";
import {assignTask, createTask, deleteTask, getAllTasks, getUncompletedTasks, updateTask} from "../controllers/task.controller.js"

const router = Router()

router.route("/createTask").post(createTask)
router.route("/assignTask").post(assignTask)
router.route("/deleteTask").post(deleteTask)
router.route("/updateTask").post(updateTask)
router.route("/getTask/:userId").get(getAllTasks)
router.route("/getUncompletedTask/:userId").get(getUncompletedTasks)
export default router