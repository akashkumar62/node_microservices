import {Router} from "express"
import AuthRoutes from "./authRoutes.js"
import UserRoutes from "./userRoutes.js"
const router = Router()
router.use("/auth",AuthRoutes )
router.use("/getUser",UserRoutes )

router.use("/getUsers",UserRoutes )
export default router