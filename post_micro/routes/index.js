import {Router} from "express"
import PostRoutes from "./postRouter.js"
const route = Router();

route.use("/api",PostRoutes)

export default route