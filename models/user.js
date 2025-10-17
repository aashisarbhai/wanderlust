const mongoose = require("mongoose");
const Schema = mongoose.Schema;  
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema= new Schema({
    email:{
        type:String,
        required:true
    }
    //passport-local-mongoose khud hi username and password by default set krleta hai toh usse define karne ki jarurat nhi hai
});

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('User', userSchema);