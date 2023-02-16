import handleError from '../utils/handleError.js'
import pool from '../config/pool.js'
import { downloadFromS3 } from './handleS3.js'

async function downloadAttachment(req, res) {
    try {
        /* const url = await pool.query(`
            SELECT url FROM conversation WHERE id=$1;`,[req.body.attachmentId]
        ) */ 
        // i think we don't need url, id is enough as key
        const file = await downloadFromS3(req.query.attachment_id, res)
        return file
    } catch (error) {
        // todo: also write the header and send the status code for it
        handleError(error, "download failed")
    }
}

export {
    downloadAttachment
}