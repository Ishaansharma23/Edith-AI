const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    user:{
        //Ye message kis user ne bheja
// ObjectId = MongoDB ka ID type
// ref: 'chatgptusers' = user collection se relation

        type: mongoose.Schema.Types.ObjectId,
        ref: 'chatgptusers'
    },
    chat:{
//         Ye message kis chat / conversation ka hai
// Ek chat me multiple messages honge
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userchats'
    },
    content:{
//         Actual message text
//  User ya AI ne jo likha

        type:String,
        required: true
    },
    role:{ // Ye batata hai message kisne bheja , Ai yani model ya User yani hum
        type: String,
        enum: ["user", "model"],
        default: "user"
    }
}, {timestamps:true} )

const messageModel = mongoose.model("messages", messageSchema);

module.exports = {messageModel}
