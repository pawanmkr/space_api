const express = require('express')
const defaultController = require('../controller/controller')

const router = express.Router()

router.get('/', defaultController.getAll);

module.exports = router;