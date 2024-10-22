import {Router} from "express"
import AuthController from "../controller/AuthController.js"
import authMiddleware from "../middleware/AuthMiddleware.js"

const router = Router()
router.post("/register", AuthController.register)
router.post("/login",AuthController.login)

// ptivate route
router.get("/user",authMiddleware, AuthController.user)

export default router