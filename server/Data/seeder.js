
require('dotenv').config();
const mongoose = require('mongoose');

const DB_HOST = process.env.DB_HOST || 'mongodb://localhost:27017/masterpiece';
console.log(process.env.DB_USER);
mongoose.connect(DB_HOST,{user:'master',pass:'master1234*',useNewUrlParser: true},function(err){
    if(err){
        console.log('error here ')
        console.log(err)
    }
    else{
        const Painting = require('../models/paintings');
        const Paintings =[
            new Painting({
                painting_name : "Abstract Painting Contemporary Art",
                image_url : "https://www.picclickimg.com/d/l400/pict/183430571995_/Abstract-Painting-Contemporary-Art-Original-Abstract-Art.jpg"
            }),
            new Painting({
                painting_name : "Abstract Painting Man",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYAlUvEq1TnyMlp67nxbRwII2ZDoho3bKGC95lpkmGxFwJ7zjh"
            }),
            new Painting({
                painting_name : "TOP ART oil painting BOB MARLEY",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKX7kHIWf_0ScZCpQc-u-hD8UxDMLbLPuFhewpBKUJ8BE_mij6"
            }),
            new Painting({
                painting_name : "Acrylic Painting",
                image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxXuOIpGuKydazx1JTCKrNLJKJpZhPXuItayqAvubcJZS4cMH-Mw"
            })
        ]
        
        
        for(var i=0;i<Paintings.length;i++){
            Paintings[i].save().then((painting)=>{
                console.log('saved '+i);
            }).catch((err)=>{
                console.log(err);
            })
        }
        
        mongoose.disconnect();
    }
});
