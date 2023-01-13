-- to create tables
CREATE TABLE IF NOT EXISTS user_table (
        id SERIAL PRIMARY KEY,
        username VARCHAR(32) NOT NULL UNIQUE,
        space_id INTEGER,
        joined_at TIMESTAMP NOT NULL
      );

CREATE TABLE IF NOT EXISTS space (
          id SERIAL PRIMARY KEY,
          name VARCHAR(64) NOT NULL,
          user_id INTEGER NOT NULL,
          capacity INTEGER DEFAULT 100,
          created_at TIMESTAMP NOT NULL,
          metadata JSON NOT NULL
        );

CREATE TABLE IF NOT EXISTS conversation (
                id SERIAL PRIMARY KEY,
                space_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL,
                message VARCHAR(256) NOT NULL,
                attachment INTEGER
            );


CREATE TABLE IF NOT EXISTS attachment (
                id SERIAL PRIMARY KEY,
                name VARCHAR(64) NOT NULL,
                type VARCHAR(64) NOT NULL,
                size INTEGER NOT NULL,
                url VARCHAR(256) NOT NULL,
                created_at TIMESTAMP NOT NULL,
                attachment_metadata JSON NOT NULL,
                space_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                conversation_id INTEGER NOT NULL
            );


CREATE TABLE IF NOT EXISTS junction_table (
          id SERIAL PRIMARY KEY,
          user_id INTEGER,
          space_id INTEGER,
          conversation_id INTEGER,
          attachment_id INTEGER,
  
            FOREIGN KEY (user_id) REFERENCES user_table(id),
            FOREIGN KEY (space_id) REFERENCES space(id),
            FOREIGN KEY (conversation_id) REFERENCES conversation(id),
            FOREIGN KEY (attachment_id) REFERENCES attachment(id)
        );

-- check if user EXISTS
SELECT * FROM user_table WHERE username=$1;

-- insert into user_table
INSERT INTO user_table (username, space_id, joined_at) VALUES ($1, $2, $3) RETURNING *;

-- insert into SPACE
INSERT INTO space (id, name, user_id, created_at, metadata) VALUES ($1, $2, $3, $4, $5) RETURNING *;

-- insert into junction_table
INSERT INTO junction_table (user_id, space_id) VALUES($1, $2) RETURNING *;