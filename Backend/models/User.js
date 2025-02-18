const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        default:Date.now,
        type:Date
    }
})
const User = mongoose.model('user',userSchema);
// User.createIndexes();
module.exports = User