const mongoose = require("mongoose");

const verifySchema = new mongoose.Schema({
    vname : {
        type : String
    },
    mobile : {
        type : Number
    },
    email :{
        type : String
    },
    add : {
        type : String
    },
    pvisit : {
        type : String
    },
    ptov : {
        type : String
    },
    intime : {
        type : String
    },
    outtime : {
        type : String
    },
    date : {
        type : String
    },
    otp : {
        type : Number
    }
})

const veri = new mongoose.model("verifyuser", verifySchema);

module.exports = veri;
