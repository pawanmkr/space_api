import chalk from 'chalk';
import pool from "../config/elephantsql.js";
import { Junction } from './junctionTable.js';

export async function createUserTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_table (
        id SERIAL PRIMARY KEY,
        username VARCHAR(32) NOT NULL UNIQUE,
        space_id INTEGER,
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
  static async addUser(username, space_id) {
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
      const user = await pool.query(
        `INSERT INTO user_table (username, space_id, joined_at) VALUES ($1, $2, $3) RETURNING *`,
        [username, space_id, new Date()]
      );
      console.log(chalk.bgGreen.black("User added"));
      return user.rows[0];
    } catch (error) {
      console.log(chalk.bgRed.white.bold("error in models/users.js while adding user"));
      console.log(error);
    }
  }

  static async memberInSpace(space_id) {
    try {
      const member = await pool.query(
        `SELECT * FROM user_table WHERE space_id=$1`,
        [space_id]
      );
      console.log(chalk.bgGreen.black("Member in space fetched"));
      return member.rows;
    } catch (error) {
      console.log(chalk.bgRed.white.bold("error in models/users.js while fetching member in space"));
      console.log(error);
    }
  }
};