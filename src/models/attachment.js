import handleError from '../utils/handleError.js'
import chalk from "chalk";
import pool from "../config/pool.js";

export default class Attachment {
    static async createAttachmentTable() {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS attachment (
                    id VARCHAR(10) PRIMARY KEY,
                    name VARCHAR(256) NOT NULL,
                    type VARCHAR(256) NOT NULL,
                    size INTEGER NOT NULL,
                    url VARCHAR(512) NOT NULL
                )  
            `);
            console.log(chalk.bgGreen.black("Attachment Table Created"));
        } catch (error) {
            handleError(error, "failed to create Attachment Table in models/attachment.js")
        }
    }

    static async addAttachment(file, uploadedFile) {
        try {
            const attachment = await pool.query(`
                INSERT INTO attachment (id, name, type, size, url) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [uploadedFile.attachmentId, file.name, file.format, parseInt(file.size), uploadedFile.url]
            )
            return attachment
        } catch (error) {
            handleError(error, "failed adding attachment in models/attachment.js")
        }
    }
}