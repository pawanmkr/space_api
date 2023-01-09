import express from "express";
import createNamespace from "../controller/createNamespace.js";
import joinNamespace from "../controller/joinNamespace.js";
import homePage from "../controller/homePage.js";

const router = express.Router()

router.get('/', homePage);

//router.post('/', createNamespace);
router.post('/create/:name', createNamespace);
router.post('/join/:name', joinNamespace);

export default router;