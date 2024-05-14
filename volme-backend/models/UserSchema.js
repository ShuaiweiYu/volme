const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    emailAdresse: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    profilePicturePath: {
        type: String
    },
    phoneNumber: {
        type: String
    }, 
    role: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);