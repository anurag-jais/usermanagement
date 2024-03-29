const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({ 
    id:{
        type: String,
        required : true
    },
    name:{
        type: String,
        required: true
    },
    dob:{
        type: Date
    },
    gender:{
        type: String,
        required: true
    },
    address:{
        type: String,
    },
    profession:{
        type: String,
    }
});
module.exports = mongoose.model('User',usersSchema); 