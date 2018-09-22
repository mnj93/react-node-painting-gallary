const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginHistory = new Schema({
    user_name : String,
    isLogged_in : {type:Boolean,default:true}
},{
    timestamps : true
})

module.exports = mongoose.model('login-history',LoginHistory);