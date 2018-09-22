const multer  =require('multer');

const CoverImageStorage = multer.diskStorage(
    {
        destination : './Files/CoverImages/',
        filename:function(req,file,cb){            
            cb(null,req.user_name+'_'+Date.now()+'_'+file.originalname);
        },
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname);
            ext = ext.toLowerCase();
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
                return callback(new Error('Invalid file, Only .png/.jpg/.jpeg file types allowed.'))
            }
            callback(null, true)
        }
    }
);


const CoverUplaod = multer({storage:CoverImageStorage});

module.exports = CoverUplaod;