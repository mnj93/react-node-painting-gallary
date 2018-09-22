const formatter = require('../helpers/responseFormatter');

exports.ValidateLoginRequest=(req,res,next)=>{
    if(Object.keys(req.body).length === 0){
        const response = formatter.FormatResponse('false','Invalid request.');
        return res.status(400).json(response);
    }
    else if(!req.body.user_name){
        const response = formatter.FormatResponse('false','Please provide user name for login.');
        return res.status(400).json(response);
    }
    else if(req.body.user_name.trim().length < 5){
        const response = formatter.FormatResponse('false','Username should be more than 5 characters long.');
        return res.status(400).json(response);
    }
    next();
}