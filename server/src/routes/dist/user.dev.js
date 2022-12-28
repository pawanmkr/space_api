"use strict";

var express = require('express');

var defaultController = require('../controller/controller');

var router = express.Router();
router.get('/', defaultController.getAll);
module.exports = router;