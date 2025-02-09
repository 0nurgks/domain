const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const Auth = mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    username:{type:String, required:true}
})

module.exports = mongoose.model("AuthModel",Auth,"Auth");