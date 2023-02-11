import chalk from "chalk";
import pool from "../config/pool.js";

export async function createAttachmentConversationMapTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS attachment_conversation_map (
                id SERIAL PRIMARY KEY,
                conversation_id INTEGER,
                attachment_id VARCHAR(10),

                    FOREIGN KEY (conversation_id) REFERENCES conversation(id),
                    FOREIGN KEY (attachment_id) REFERENCES attachment(id)
        );`
    );
    console.log(chalk.bgGreen.black("Attachment Conversation Map Table Created"))
    } catch (error) {
        console.log(
            chalk.bgRed.white.bold("error in models/attachmentConversation.js while creating attachment conversation map table"
        ));
        console.log(error);
    }
};