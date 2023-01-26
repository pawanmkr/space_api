import chalk from "chalk";
import pool from "../config/elephantsql.js";

export async function createConversationTable() {
    return new Promise((resolve, reject) => {
        pool.query(`
            CREATE TABLE IF NOT EXISTS conversation (
                id SERIAL PRIMARY KEY,
                space_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL,
                message VARCHAR(256) NOT NULL,
                attachment INTEGER
            );`
        )
        .then(() => {
            console.log(chalk.bgGreen.black("Conversation Table Created"));
            resolve();
        })
        .catch((error) => {
            console.log(
                chalk.bgRed.white.bold("error in models/conversation.js while creating conversation table")
            );
            console.log(error);
            reject();
        });
    });
};