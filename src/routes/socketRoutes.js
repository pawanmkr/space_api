import express from "express";
import url from 'url'

import createSpace from "../controller/createSpace.js";
import joinSpace from "../controller/joinSpace.js";
import User from "../models/user.js";
import { Space } from "../models/space.js";
import { downloadAttachment } from "../controller/downloadAttachment.js";

const router = express.Router()

router.get('/loaderio-0322896b81b856472cf240f5e4a889ad', (req, res) => {
    res.sendFile(path.join(
        __dirname, '..', '/utils', '/loaderio-0322896b81b856472cf240f5e4a889ad.txt'
    ));
});

async function spaceHandler(req, res, func) {
    const extractData = await func(req, res);
    const activity = await User.findUserbySpace(extractData.shareableSpaceId);
    const allSpace = await Space.findSpacebyUserId(extractData.userId);
    return res.status(200).json({
        extractData,
        activity,
        allSpace
    });
};

// handleDownloads
router.get('/:attachmentId', async (req, res) => {
    const start = performance.now()
    const file = await downloadAttachment(req, res)
    const end = performance.now()
    console.log(end-start)
    res.send(file)
    res.status(200)
})

router.post('/join/:name', async (req, res) => {
    await spaceHandler(req, res, joinSpace);
});

router.post('/create/:name', async (req, res) => {
    await spaceHandler(req, res, createSpace);
});

export default router;