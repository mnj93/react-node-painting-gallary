const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginHistory = new Schema({
    user_name : {type:String,lowercase : true},
    isLogged_in : {type:Boolean,default:true}
},{
    timestamps : true
})

module.exports = mongoose.model('login-history',LoginHistory);