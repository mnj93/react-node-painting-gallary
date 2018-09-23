const formatter = require('../helpers/responseFormatter');
const LoginHistory = require('../models/loginHistory');
const Paintings = require('../models/paintings');
exports.GET_USERS = (req,res,next)=>{
    if(req.query.q){
        const regex = new RegExp(escape(req.query.q));
        LoginHistory.find({user_name : {$regex: regex ,$options:'i'}}).distinct('user_name').then((users)=>{
            const response = formatter.FormatResponse('true','Users fetched successfully.',users);
            return res.status(200).json(response);
        }).catch((err)=>{
            return next(err);
        })
    }
    else{
        LoginHistory.find().distinct('user_name').then((users)=>{
            const response = formatter.FormatResponse('true','Users fetched successfully.',users);
            return res.status(200).json(response);
        }).catch((err)=>{
            return next(err);
        })
    }
}

exports.GET_USER_LIKES=(req,res,next)=>{
    if(req.params.username){
        Paintings.find({is_active : true,liked_by:req.params.username}).then((paintings)=>{
            const response = formatter.FormatResponse('true','User likes fetched.',paintings);
            return res.status(200).json(response);
        }).catch((err)=>{
            return next(err);
        })
    }
    else{
       const response = formatter.FormatResponse('false','Resource not found.');
       return res.status(404).json(response);
    }
}