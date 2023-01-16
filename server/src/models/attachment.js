import chalk from "chalk";
import pool from "../config/pool.js";

export async function createAttachmentTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS attachment (
                id SERIAL PRIMARY KEY,
                name VARCHAR(64) NOT NULL,
                type VARCHAR(64) NOT NULL,
                size INTEGER NOT NULL,
                url VARCHAR(256) NOT NULL,
                created_at TIMESTAMP NOT NULL,
                attachment_metadata JSON NOT NULL,
                space_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                conversation_id INTEGER NOT NULL
            );`
        );
        console.log(chalk.bgGreen.black("Attachment Table Created"));
    } catch (error) {
        console.log(
        chalk.bgRed.white.bold("error in models/attachment.js while creating attachment table")
        );
        console.log(error);
    }
};