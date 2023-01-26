import chalk from "chalk";
import pool from "../config/elephantsql.js";
import { createUserTable } from "../models/user.js";
import { createConversationTable } from "../models/conversation.js";
import { createAttachmentTable } from "../models/attachment.js";
import { Junction } from "../models/junctionTable.js";
import { createAttachmentConversationMapTable } from "../models/attachmentConversation.js";
import { Space } from "../models/space.js";

export default async function createTables() {
  try {
    await createUserTable();
    await Space.createSpaceTable();
    await createConversationTable();
    await createAttachmentTable();
    await Junction.createJunctionTable();
    console.log(chalk.bgGreen.black("All Tables Created\n"));
  } catch (error) {
    console.log(
      chalk.bgRed.white.bold("error in controller/createTables.js while creating tables")
    );
    console.log(error);
  }
}