const authRoutes = require('./server/routes/auth');
const paintingRoutes = require('./server/routes/painting');
const userRoutes = require('./server/routes/users');
module.exports  = (app) => {
    app.get('/',(req,res)=>{
        res.status(200).json('Masterpiece - API');
    });
    app.use('/auth',authRoutes);
    app.use('/paintings',paintingRoutes);
    app.use('/users',userRoutes)
    // app.use('/*',(req,res)=>{
    //     res.status(404).json(formatter.FormatResponse('false','Resource not found.'));
    // });  
}   