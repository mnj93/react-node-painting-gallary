const express = require('express');
const router = express.Router();
const controller = require('../controller/auth');
const validation = require('../validation/auth');

router.post('/',validation.ValidateLoginRequest,controller.USER_LOGIN);


module.exports = router;