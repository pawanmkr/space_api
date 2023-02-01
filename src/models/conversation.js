import chalk from "chalk";
import pool from "../config/elephantsql.js";
import User from "./user.js";
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

    static async loadChatsbySpaceId(spaceId) {
        try {
            const msg = await pool.query(`
                SELECT * FROM conversation WHERE space_id = $1 ORDER BY created_at`, 
                [spaceId]
            );
            let attachment = null;
            /* if (msg.rows[0].attachment) {
                attachment = await Attachment.getAttachmentbyId(msg.rows[0].attachment);
            } */
            console.log(msg.rows);
            const chats = msg.rows.map(async message => {
                return {
                  username: await User.findUsernamebyId(message.user_id),
                  created_at: message.created_at,
                  message: message.message
                }
            });
            const chatHistory = await Promise.all(chats);
            console.log(chatHistory);
            return chatHistory;
        } catch (error) {
            console.log(chalk.bgRed.white.bold("error in models/conversation.js while loading chats"));
            console.log(error);
        }
    }    
}