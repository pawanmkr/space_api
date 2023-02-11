import handleError from '../utils/handleError.js'
import chalk from "chalk";
import pool from "../config/pool.js";

export default class Attachment {
    static async createAttachmentTable() {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS attachment (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(64) NOT NULL,
                    type VARCHAR(64) NOT NULL,
                    size INTEGER NOT NULL,
                    url VARCHAR(256) NOT NULL
                )  
            `);
            console.log(chalk.bgGreen.black("Attachment Table Created"));
        } catch (error) {
            handleError(error, "failed to create Attachment Table in models/attachment.js")
        }
    }

    static async addAttachment(file, url) {
        try {
            const fileData = await pool.query(`
                INSERT INTO attachment (name, type, size, url) VALUES ($1, $2, $3, $4) RETURNING *`,
                [file.name, file.format, file.size, url]
            )
            console.log(fileData)
            return fileData
        } catch (error) {
            handleError(error, "failed adding attachment in models/attachment.js")
        }
    }
}