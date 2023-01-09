

export const createSpacesTable = `
  CREATE TABLE IF NOT EXISTS spaces (
    space_id SERIAL PRIMARY KEY,
    space_name VARCHAR(64) NOT NULL,
    user_id INTEGER NOT NULL,
    capacity INTEGER DEFAULT 100,
    created_at TIMESTAMP NOT NULL,
    metadata JSON NOT NULL,

      FOREIGN KEY (user_id) REFERENCES users(user_id)
  );
`;