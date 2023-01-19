import chalk from 'chalk';
import pool from "../config/elephantsql.js";
import { Junction } from './junctionTable.js';

export async function createUserTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_table (
        id SERIAL PRIMARY KEY,
        username VARCHAR(32) NOT NULL UNIQUE,
        joined_at TIMESTAMP NOT NULL
      );
    `);
    console.log(chalk.bgGreen.black("User table created"));
  } catch (error) {
    console.log("error in models/users.js while creating user table");
    console.log(chalk.bgRed.white.bold(`ERROR >>> ${error}`));
  }
};

export class User {
  static async addUser(username) {
    // check if user already exist
    try {
      const checkUser = await pool.query(
        `SELECT * FROM user_table WHERE username=$1`,
        [username]
      );
      if( checkUser.rowCount > 0 ){
        console.log('user already exist');
        return checkUser.rows[0];
      }
    } catch (error) {
      console.log(chalk.bgRed.white.bold("error in models/users.js while checking if user exist"));
      console.log(error);
    }

    // create if user doesn't exist
    try {
      const user = await pool.query(`
      INSERT INTO user_table (username, joined_at)
          VALUES ($1, $2) RETURNING *
        `,[username, new Date()]
      );
      console.log(chalk.bgGreen.black("User added"));
      return user.rows[0];
    } catch (error) {
      console.log(chalk.bgRed.white.bold("error in models/users.js while adding user"));
      console.log(error);
    }
  }

  static async findUserbySpace(space_share_id) {
    try {
      const spaceId = await pool.query(`
        SELECT id FROM space
          WHERE share_id = '${space_share_id}';
      `);
      console.log(spaceId)
      const userList =  await pool.query(`
        SELECT username FROM user_table
          JOIN junction_table ON user_table.id = junction_table.user_id
          WHERE junction_table.space_id = ${spaceId.rows[0].id};
      `);
      return userList.rows;
    } catch (error) {
      console.log(chalk.bgRed.white.bold("error in models/users.js while findind user by space id"));
      console.log(error);
    }
  }
};