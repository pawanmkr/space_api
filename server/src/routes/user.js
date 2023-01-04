import express from "express";
import { getAll as defaultController } from "../controller/controller.js";

const router = express.Router()

router.get('/not-in-use-yet', defaultController);


export default router;