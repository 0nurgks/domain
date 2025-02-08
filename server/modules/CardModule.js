const mongoose = require("mongoose");
const AuthModel = require("./AuthModule");

const Card = mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "AuthModel"},
    textarea1:{type:String,required: true},
    textarea2:{type:String},
    textarea3:{type:String},
    textarea4:{type:String},
    textarea5:{type:String},
    image: {
        type: String
    },

})

module.exports = mongoose.model("CardModel",Card,"Cards");