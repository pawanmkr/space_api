
export const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(32) NOT NULL,
    space_id INTEGER NOT NULL,
    joined_at TIMESTAMP NOT NULL
  );
`;