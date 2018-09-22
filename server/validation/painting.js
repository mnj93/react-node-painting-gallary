const formatter = require('../helpers/responseFormatter');
const mongoose = require('mongoose');
exports.ValidatePaintingIdInParam = (req,res,next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.painting_id)){
        const response = formatter.FormatResponse('false','Resource not found.');
        return res.status(404).json(response);
    }
    next();
}