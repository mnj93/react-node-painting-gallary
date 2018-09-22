const express = require('express');
const router = express.Router();
const controller = require('../controller/painting');
const authenticate = require('../middlewares/authenticate');
const validation = require('../validation/painting');
const CoverUpload = require('../helpers/FileUploader');

router.get('/',controller.GET_PAINTINGS);
router.get('/:painting_id',authenticate,validation.ValidatePaintingIdInParam,controller.GET_PAINTING_DETAILS);
router.post('/:painting_id/like',authenticate,validation.ValidatePaintingIdInParam,controller.ADD_NEW_LIKE);
router.post('/:painting_id/update',authenticate,validation.ValidatePaintingIdInParam,CoverUpload.single('cover_image'),controller.UPDATE_PAINTING);
router.post('/:painting_id/delete',authenticate,validation.ValidatePaintingIdInParam,controller.DELETE_PAINTING);
module.exports = router;