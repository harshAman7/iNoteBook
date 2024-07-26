const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/iNotebook";
async function connectToMongo (){

    await mongoose.connect(mongoURI).then(()=>
        console.log("SUCCESS")
    ).catch(err=>console.log(err));
}
module.exports = connectToMongo;