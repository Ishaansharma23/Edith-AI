const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    user:{ // konse user ki ye chat h
        type: mongoose.Schema.Types.ObjectId, // jo id humne store kri ,
        ref:'chatgptusers', // jo id hai wo chatgptuser collection s belong krti h 
        required: true
    },
    title:{
        type: String,
        required: true
    },
    lastActivity: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

const chatModel = mongoose.model("userChat", chatSchema);

module.exports = chatModel;