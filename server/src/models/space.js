import chalk from "chalk";
import pool from "../config/pool.js";


export class Space {
  static async createSpaceTable() {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS space (
          id SERIAL PRIMARY KEY,
          name VARCHAR(64) NOT NULL,
          user_id INTEGER NOT NULL,
          capacity INTEGER DEFAULT 100,
          created_at TIMESTAMP NOT NULL,
          metadata JSON NOT NULL
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

  static async addSpace(space_id, space_name, user_id, space_metadata) {
    return new Promise(async (resolve, reject) => {
      await pool.query(`
        INSERT INTO space (id, name, user_id, created_at, metadata) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
        [space_id, space_name, user_id, new Date(), space_metadata])
      .then((result) => {
        console.log(chalk.bgGreen.black("Space Added"));
        return resolve(result.rows[0].id);
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
};