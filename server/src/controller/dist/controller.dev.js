"use strict";

var db = require('../../database/db');

var getAll = function getAll(req, res) {
  db.pool.query('SELECT * FROM task_management.employee', function (error, result) {
    if (error) {
      console.log(error);
    }

    res.status(200).json(result.rows);
    console.log('Users fetched successfully!');
  });
};

var pickmsg = function pickmsg(req, res) {
  var user = body.user;
};

module.exports = {
  getAll: getAll
};