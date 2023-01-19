import chalk from "chalk";
import pool from "../config/elephantsql.js";


export class Space {
  static async createSpaceTable() {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS space (
          id SERIAL PRIMARY KEY,
          share_id VARCHAR(6) NOT NULL,
          name VARCHAR(64) NOT NULL,
          capacity INTEGER DEFAULT 100,
          created_at TIMESTAMP NOT NULL
        );`
      );
      console.log(chalk.bgGreen.black("Space Table Created"));
    } catch (error) {
      console.log(
        chalk.bgRed.white.bold("error in models/space.js while creating space table")
      );
      console.log(error);
    }
  };

  static async addSpace(space_share_id, space_name) {
    return new Promise(async (resolve, reject) => {
      await pool.query(`
        INSERT INTO space (share_id, name, created_at) VALUES ($1, $2, $3) RETURNING *;`,
        [space_share_id, space_name, new Date()])
      .then((result) => {
        console.log(chalk.bgGreen.black("Space Added"));
        return resolve(result.rows[0]);
      })
      .catch((error) => {
        console.log(
          chalk.bgRed.white.bold("error in models/space.js while adding space")
        );
        console.log(error);
        reject();
      });
    });
  }

  static async getAllSpace() {
    return new Promise(async (resolve, reject) => {
      await pool.query(
        `SELECT * FROM space;`)
      .then((result) => {
        console.log(chalk.bgGreen.black("All Space Fetched"));
        return resolve(result.rows);
      })
      .catch((error) => {
        console.log(
          chalk.bgRed.white.bold("error in models/space.js while getting all space")
        );
        console.log(error);
        reject();
      });
    });
  }

  static async findSpacebyId(space_share_id) {
    try {
      return await pool.query(
        `SELECT * FROM space WHERE share_id = '${space_share_id}';`
      );
    } catch (error) {
      console.log(
        chalk.bgRed.white.bold("error in models/space.js while getting all space")
      );
      console.log(error);
    }
  }
};