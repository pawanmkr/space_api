import express from "express";
import joinSpace from "../controller/joinSpace.js";
import homePage from "../controller/homePage.js";
import { User } from "../models/user.js";
import { Space } from "../models/space.js";

const router = express.Router()

router.get('/', homePage);

router.get('/loaderio-0322896b81b856472cf240f5e4a889ad', (req, res) => {
    res.sendFile(path.join(
        __dirname, '..', '/utils', '/loaderio-0322896b81b856472cf240f5e4a889ad.txt'
    ));
});

router.post('/join/:name', async (req, res) => {
    console.log(req.body)
    const extractData = await joinSpace(req, res);
    const activity = await User.memberInSpace(extractData.shareableSpaceId);
    const allSpace = await Space.getAllSpace();
    console.log(extractData);
    console.log(activity);
    return res.status(200).json({
        extractData,
        activity,
        allSpace
    });
});

export default router;