

export const createJoinedSpacesTable = `
  CREATE TABLE IF NOT EXISTS joined_spaces (
    user_id INTEGER NOT NULL,
    space_id INTEGER NOT NULL,

      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (space_id) REFERENCES spaces(space_id)
  );
`;