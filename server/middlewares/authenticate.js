const jwt = require('jsonwebtoken');
const formatter = require('../helpers/responseFormatter');
const LoginHistory = require('../models/loginHistory');
const JWT_SECRET = process.env.JWT_SECRET;

const Authenticate = (req,res,next)=>{
    const header = req.headers.authorization;   
    let token;
    if(header) token = header.split(' ')[1];

    if(token){
        jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if(err){
                res.status(401).json({success:"false",msg:"Unauthorized!"});
            }
            LoginHistory.findOne({user_name : decoded.user_name,isLogged_in : true}).then((history)=>{
                if(history){
                    req.user_name = decoded.user_name;
                    next();
                }
                else{
                    res.status(401).json({success:"false",msg:"Unauthorized!"});
                }
            }).catch((err)=>{
                return next(err);
            });
        });
    }
    else{
        const response = formatter.FormatResponse('false','You are not authorized.');
        return res.status(401).json(response);
    }
}

module.exports = Authenticate;