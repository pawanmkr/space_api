
export const createAttachmentTable = `
    CREATE TABLE IF NOT EXISTS attachments (
        attachment_id SERIAL PRIMARY KEY,
        attachment_name VARCHAR(64) NOT NULL,
        attachment_type VARCHAR(64) NOT NULL,
        attachment_size INTEGER NOT NULL,
        attachment_url VARCHAR(256) NOT NULL,
        attachment_created_at TIMESTAMP NOT NULL,
        attachment_metadata JSON NOT NULL,
        attachment_space_id INTEGER NOT NULL,
        attachment_user_id INTEGER NOT NULL,
        attachment_conversation_id INTEGER NOT NULL,
        FOREIGN KEY (attachment_space_id) REFERENCES spaces(space_id),
        FOREIGN KEY (attachment_user_id) REFERENCES users(user_id),
        FOREIGN KEY (attachment_conversation_id) REFERENCES conversation(conversation_id)
    );
`;