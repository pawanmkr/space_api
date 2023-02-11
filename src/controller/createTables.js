import handleError from "../utils/handleError.js";
import chalk from "chalk";
import User from "../models/user.js";
import Conversation from "../models/conversation.js";
import Attachment from "../models/attachment.js";
import { Junction } from "../models/junctionTable.js";
import { createAttachmentConversationMapTable } from "../models/attachmentConversation.js";
import { Space } from "../models/space.js";

export default async function createTables() {
  try {
    await User.createUserTable();
    await Space.createSpaceTable();
    await Attachment.createAttachmentTable(); 
    await Conversation.createConversationTable();
    await Junction.createJunctionTable();
    console.log(chalk.bgGreen.black("All Tables Created\n"));
  } catch (error) {
    handleError(error, "error in controller/createTables.js while creating tables")
  }
}