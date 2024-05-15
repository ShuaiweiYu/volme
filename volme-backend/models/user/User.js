const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class User {
    constructor(emailAddress, username, hashedPassword, role) {
        this.emailAddress = emailAddress;
        this.username = username;
        this.hashedPassword = hashedPassword;
        this.role = role;
        this.profilePicturePath = "";
        this.phoneNumber = "";
    }

    setProfilePicturePath(path) {
        this.profilePicturePath = path;
    }

    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}

const UserSchema = new Schema({
    emailAddress: {
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

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
    User,
    UserModel
}