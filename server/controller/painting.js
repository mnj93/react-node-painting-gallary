const Painting = require('../models/paintings');
const formatter = require('../helpers/responseFormatter');

exports.GET_PAINTINGS=(req,res,next) => {
    Painting.find({is_active : true}).then((results)=>{
        const response = formatter.FormatResponse('true','Paintings fetched.',results);
        return res.status(200).json(response);
    }).catch((err)=>{
        return next(err);
    });
}
exports.GET_PAINTING_DETAILS=(req,res,next)=>{
    Painting.findOne({_id:req.params.painting_id,is_active : true}).then((painting)=>{
        if(painting){
            const response = formatter.FormatResponse('true','Painting details fetched.',painting);
            return res.status(200).json(response)
        }
        else{
            const response = formatter.FormatResponse('false','Resource not found.');
            return res.status(404).json(response);
        }
    }).catch((err)=>{
        return next(err);
    })
}
exports.ADD_NEW_LIKE = (req,res,next)=>{
    Painting.findOne({_id : req.params.painting_id}).then((painting)=>{
        if(painting){
            console.log(req.user_name);
            console.log(painting.liked_by.indexOf(req.user_name));
            if(painting.liked_by.indexOf(req.user_name) < 0){
                 painting.addLike(req.user_name).then((result)=>{
                    if(result){
                        const response = formatter.FormatResponse('true','Liked successfully.');
                        return res.status(200).json(response);
                    }else{
                        const response = formatter.FormatResponse('false','Error occured while processing request.');
                        return res.status(200).json(response);
                    }
                }).catch((err)=>{
                    return next(err);
                })
            }
           else{
            painting.removeLike(req.user_name).then((result)=>{
                if(result){
                    const response = formatter.FormatResponse('true','Like removed successfully.');
                    return res.status(200).json(response);
                }else{
                    const response = formatter.FormatResponse('false','Error occured while processing request.');
                    return res.status(200).json(response);
                }
            }).catch((err)=>{
                return next(err);
            })
           }        
        }
        else{

        }        
    }).catch((err)=>{
        return next(err);
    });
}

exports.UPDATE_PAINTING = (req,res,next)=>{   
    Painting.findOne({_id:req.params.painting_id}).then((painting)=>{
        if(painting){           
            painting.painting_name = req.body.painting_name;
            painting.painting_desc = req.body.painting_desc;
            if(req.file){
                const hostname = req.protocol+'://'+req.get('host')+'/';
                let filePath =hostname + req.file.path;
                filePath = filePath.replace('\\','/').replace('\\','/');            
                painting.image_url = filePath;
            }
           painting.save().then((result)=>{
               const response = formatter.FormatResponse('true','Painting updated successfully.');
               return res.status(200).json(response);
           }).catch((err)=>{
               return next(err);
           });
        }
        else{
            const response = formatter.FormatResponse('false','Resource not found.');
            return res.status(404).json(response);
        }
    }).catch((err)=>{
        return next(err);
    })
}

exports.DELETE_PAINTING = (req,res,next)=>{
    Painting.findOneAndUpdate({_id : req.params.painting_id},{$set:{is_active : false}}).then((painting)=>{
        if(painting){
            const response = formatter.FormatResponse('true','Painting deleted successfully.');
            return res.status(200).json(response);
        }
        else{
            const response = formatter.FormatResponse('false','Resource not found.');
            return res.status(404).json(response);
        }
    }).catch((err)=>{
        return next(err);
    })
}