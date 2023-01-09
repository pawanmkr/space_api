import pool from "../config/pool.js";
import { createUsersTable } from "../models/users.js";
import { createSpacesTable } from "../models/spaces.js";
import { createJoinedSpacesTable } from "../models/joined_spaces.js";
import { createConversationTable } from "../models/conversation.js";
import { createAttachmentTable } from "../models/attachments.js";
import addForeignKey from "./addForeignKey.js";

export default async function createTables() {
    try {
        await pool.query(createUsersTable);
        await pool.query(createSpacesTable);
        await pool.query(createJoinedSpacesTable);
        await pool.query(createConversationTable);
        await pool.query(createAttachmentTable);
        await addForeignKey();
    } catch (err) {
        console.log(err);
    }
};