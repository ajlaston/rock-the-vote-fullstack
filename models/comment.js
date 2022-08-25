const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({

    email : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    created : {
        type : Date,
        required : true
    },

    issue : {
        type : Schema.Types.ObjectId,
        ref : "Issue",
        required : true
    },

    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
})

module.exports = mongoose.model('Comment', commentSchema);