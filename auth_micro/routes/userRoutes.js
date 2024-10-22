import {Router} from "express"
import UserController from "../controller/UserController.js"


const router = Router()

router.get("/:id",UserController.getUser)
router.post("/",UserController.getUsers)

export default router