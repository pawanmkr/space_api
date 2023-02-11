import chalk from "chalk";
import pool from "../config/pool.js";
import User from "./user.js";
//import Attachment from '../models/attachment.js';
import handleError from "../utils/handleError.js";

export default class Conversation {
    static async createConversationTable() {
        return new Promise((resolve, reject) => {
            pool.query(`
                CREATE TABLE IF NOT EXISTS conversation (
                    id SERIAL PRIMARY KEY,
                    space_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    created_at TIMESTAMP NOT NULL,
                    message VARCHAR(4096),
                    attachment_id VARCHAR(10),
                    CHECK (message IS NOT NULL OR attachment_id IS NOT NULL),
                    
                    FOREIGN KEY (attachment_id) REFERENCES attachment(id)
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

    static async addMessage(spaceId, userId, message, attachmentId) {
        try {
            if (attachmentId) { // if there is only attachment then do this
                await pool.query(`
                    INSERT INTO conversation (space_id, user_id, created_at, attachment_id) VALUES ($1, $2, $3, $4) RETURNING *`, 
                    [spaceId, userId, new Date(), attachmentId] 
                )
            } else { // when there is only text-message
                let msg = await pool.query(`
                    INSERT INTO conversation (space_id, user_id, message, created_at) VALUES ($1, $2, $3, $4) RETURNING *`, 
                    [spaceId, userId, message, new Date()] 
                )
                return msg.rows[0].message
            }
        } catch (error) {
            handleError(error, "failed adding msg in models/conversation.js")
        }
    };

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
    };    
};