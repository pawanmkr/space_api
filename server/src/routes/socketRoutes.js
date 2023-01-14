import express from "express";
import joinSpace from "../controller/joinSpace.js";
import homePage from "../controller/homePage.js";

const router = express.Router()

router.get('/', homePage);

router.get('/loaderio-0322896b81b856472cf240f5e4a889ad', (req, res) => {
    res.sendFile(path.join(
        __dirname, '..', '/utils', '/loaderio-0322896b81b856472cf240f5e4a889ad.txt'
    ));
});

router.post('/join/:name', async (req, res) => {
    await joinSpace(req, res)
    .then((data) => {
        console.log(data);
        res.status(200).json(data);
    });
});

export default router;