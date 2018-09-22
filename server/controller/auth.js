const LoginHistory = require('../models/loginHistory');
const jwt = require('jsonwebtoken');
const formatter = require('../helpers/responseFormatter');

exports.USER_LOGIN = (req,res,next)=>{
    LoginHistory.findOneAndUpdate({user_name : req.body.user_name},{$set : {isLogged_in : false}}).then((result)=>{
        const newLogin = new LoginHistory({
            user_name : req.body.user_name
        })
        newLogin.save().then((user)=>{
            const userToken =  jwt.sign({user_name:user.user_name},process.env.JWT_SECRET);
            const resJson = {
                user : user,
                token : userToken
            }  
            const response = formatter.FormatResponse('true','Login successful.',resJson);
            return res.status(200).json(response);
        }).catch((err)=>{
            return next(err);
        });
    }).catch((err)=>{
        return next(err);
    })
}
