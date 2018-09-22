const authRoutes = require('./server/routes/auth');
const paintingRoutes = require('./server/routes/painting');
const formatter = require('./server/helpers/responseFormatter');

module.exports  = (app) => {
    app.get('/',(req,res)=>{
        res.status(200).json('Masterpiece - API');
    });
    app.use('/auth',authRoutes);
    app.use('/paintings',paintingRoutes);
    app.use('/*',(req,res)=>{
        res.status(404).json(formatter.FormatResponse('false','Resource not found.'));
    });  
}   