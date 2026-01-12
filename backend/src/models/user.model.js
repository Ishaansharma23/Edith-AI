const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique:true,
    },
    fullName: {
        firstName:{
            type:String,
            required: true, 
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    password:{
        type:String,
    }
}, {
    timestamps:true // user ka data kab update hua tha db m ya create kab hota hai ye db m mention hojati h
}
)

const userModel = mongoose.model("ChatGptUser", userSchema);
module.exports = userModel;