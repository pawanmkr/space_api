import pool from '../config/pool.js';

export default async function addForeignKey() {
    pool.query(`
        ALTER TABLE users
        ADD FOREIGN KEY (space_id) REFERENCES spaces(space_id);
    `);
    pool.query(`
        ALTER TABLE conversation
        ADD FOREIGN KEY (attachment) REFERENCES attachments(attachment_id)
    `);
};