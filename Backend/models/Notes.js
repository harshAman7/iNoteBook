const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        // unique:true
    },
    tag:{
        type:String,
        default:"GENERAL"
    },
    date:{
        default:Date.now,
        type:Date
    }
})

// module.exports = mongoose.model('user',NotesSchema)
const Notes = mongoose.model('note',NotesSchema);
module.exports = Notes