import express from "express";
import createNamespace from "../controller/createNamespace.js";
import joinNamespace from "../controller/joinNamespace.js";
import homePage from "../controller/homePage.js";

const router = express.Router()

router.get('/', homePage);

router.get('/loaderio-0322896b81b856472cf240f5e4a889ad', (req, res) => {
    res.sendFile(path.join(
        __dirname, '..', '/utils', '/loaderio-0322896b81b856472cf240f5e4a889ad.txt'
    ));
});

//router.post('/', createNamespace);
router.post('/create/:name', createNamespace);
router.post('/join/:name', joinNamespace);

export default router;