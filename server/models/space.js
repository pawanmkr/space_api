import chalk from "chalk";
import pool from "../config/pool.js";

export async function createSpaceTable() {
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