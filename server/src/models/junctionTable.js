import chalk from "chalk";
import pool from "../config/pool.js";

export class Junction {
  static async createJunctionTable() {
    return new Promise(async (resolve, reject) => {
      pool.query(`
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
        );`
      )
      .then(() => {
        console.log(chalk.bgGreen.black("Junction Table Created"));
        resolve();
      })
      .catch((error) => {
        console.log(
          chalk.bgRed.white.bold("error in models/junctionTable.js while creating junction table")
        );
        console.log(error);
        reject();
      });
    });
  }

  static async addJunction(user_id, space_id) {
    return new Promise( async (resolve, reject) => {
      pool.query(
        `INSERT INTO junction_table (user_id, space_id) VALUES($1, $2) RETURNING *`,
        [user_id, space_id]
      )
      .then(() => {
        console.log(chalk.bgGreen.black("Junction added"));
        resolve();
      })
      .catch((error) => {
        console.log(
          chalk.bgRed.white.bold("error in models/junctionTable.js while adding junction")
        );
        console.log(error);
        reject();
      });
    })
  }
}