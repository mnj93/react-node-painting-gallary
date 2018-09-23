const express = require('express');
const router = express.Router();
const auithenticate = require('../middlewares/authenticate');
const controller = require('../controller/users');
const Validation = require('../validation/users');
router.get('/',auithenticate,controller.GET_USERS);
router.get('/:username/likes',auithenticate,Validation.ValidateUserLikeRequest,controller.GET_USER_LIKES)

module.exports = router;