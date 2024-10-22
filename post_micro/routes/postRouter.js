import { Router } from "express";
import PostController from "../controller/PostController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const route = Router()

route.get("/post",PostController.index)
route.post("/post",authMiddleware,PostController.store)

export default route