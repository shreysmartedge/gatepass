const mongoose = require("mongoose");

const HostSchema = new mongoose.Schema({
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

const Host = new mongoose.model("host", HostSchema);

module.exports = Host;
