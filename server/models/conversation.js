

export const createConversationTable = `
    CREATE TABLE IF NOT EXISTS conversation (
        conversation_id SERIAL PRIMARY KEY,
        space_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        send_time TIMESTAMP NOT NULL,
        message VARCHAR(256) NOT NULL,
        attachment INTEGER,

        FOREIGN KEY (space_id) REFERENCES spaces(space_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );
`;