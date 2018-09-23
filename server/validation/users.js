const formatter = require('../helpers/responseFormatter');

exports.ValidateUserLikeRequest=(req,res,next)=>{
    if(!req.params.username){
        const response = formatter.FormatResponse('false','Resource not found.');
        return res.status(404).json(response);
    }
    else if(!/^[a-zA-Z0-9 ]*$/.test(req.params.username)){
        const json = formatter.FormatResponse('false','Resource not found.');
        return res.status(404).json(json);
    }
    next();
}