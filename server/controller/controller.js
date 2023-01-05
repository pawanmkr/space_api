import db from "../database/db.js";

export const getAll = (req, res) => {
    db.pool.query('SELECT * FROM task_management.employee', (error, result) => {
        if(error) {
            console.log(error);
        }
        res.status(200).json(result.rows);
        console.log('Users fetched successfully!');
    });
}

const pickmsg = (req, res) => {
    var user = body.user;
}