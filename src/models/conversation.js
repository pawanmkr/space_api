import chalk from "chalk";
import pool from "../config/elephantsql.js";
//import Attachment from '../models/attachment.js';

export default class Conversation {
    static async createConversationTable() {
        return new Promise((resolve, reject) => {
            pool.query(`
                CREATE TABLE IF NOT EXISTS conversation (
                    id SERIAL PRIMARY KEY,
                    space_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    created_at TIMESTAMP NOT NULL,
                    message VARCHAR(256) NOT NULL,
                    attachment INTEGER DEFAULT NULL
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

    static async addMessage(spaceId, userId, message) {
        try {
            const msg = await pool.query(`
                INSERT INTO conversation (space_id, user_id, message, created_at) VALUES ($1, $2, $3, $4) RETURNING *`, 
                [spaceId, userId, message, new Date()]
            );
            let attachment = null;
            /* if (msg.rows[0].attachment) {
                attachment = await Attachment.getAttachmentbyId(msg.rows[0].attachment);
            } */
            console.log({
                message: msg.rows[0].message,
                attachment: attachment
            });
            return {
                message: msg.rows[0].message,
                attachment: attachment
            };
        } catch (error) {
            console.log(chalk.bgRed.white.bold("error in models/conversation.js while adding message"));
            console.log(error);
        }
    }

    static async loadChatsbySpaceId(spaceId, userId, message) {
        try {
            const msg = await pool.query(`
                INSERT INTO conversation (space_id, user_id, message) VALUES ($1, $2, $3) RETURNING *`, 
                [spaceId, userId, message]
            );
            let attachment = null;
            /* if (msg.rows[0].attachment) {
                attachment = await Attachment.getAttachmentbyId(msg.rows[0].attachment);
            } */
            return {
                message: msg.rows[0].message,
                attachment: attachment
            };
        } catch (error) {
            console.log(chalk.bgRed.white.bold("error in models/conversation.js while adding message"));
            console.log(error);
        }
    }    
}