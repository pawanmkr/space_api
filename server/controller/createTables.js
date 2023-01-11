import chalk from "chalk";
import pool from "../config/pool.js";
import { createUserTable } from "../models/user.js";
import { createSpaceTable } from "../models/space.js";
import { createConversationTable } from "../models/conversation.js";
import { createAttachmentTable } from "../models/attachment.js";
import { createJunctionTable } from "../models/junctionTable.js";
import { createAttachmentConversationMapTable } from "../models/attachmentConversation.js";

export default async function createTables() {
  try {
    await createUserTable();
    await createSpaceTable();
    await createConversationTable();
    await createAttachmentTable();
    await createJunctionTable();
    console.log(chalk.bgGreen.black("All Tables Created"));
  } catch (error) {
    console.log(
      chalk.bgRed.white.bold("error in controller/createTables.js while creating tables")
    );
    console.log(error);
  }
}