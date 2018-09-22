const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaintingSchema = new Schema({
    painting_name : String,
    artist_id : {type:Schema.Types.ObjectId,ref:'artist'},
    painting_desc:String,
    likes : Number,
    liked_by : [String],
    image_url : String,
    is_active :{type:Boolean,default:true}
},{
    timestamps : true
})

PaintingSchema.methods.addLike = function(u){
    this.likes++;
    this.liked_by.push(u);
    return this.save();
}
PaintingSchema.methods.removeLike = function(u){
    this.likes--;
    this.liked_by.pull(u);
    return this.save();
}
module.exports = mongoose.model('painting',PaintingSchema,'paintings');