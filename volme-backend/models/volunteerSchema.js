const mongoose = require('mongoose');
const User = require('./UserSchema');

const VolunteerSchema = new mongoose.Schema({
    ...User.schema.obj,
    participationCount: {
        type: Number,
        required: true
    },
    birthday: {
        type: Date
    },
    skills: {
        type: [String]
    },
    languages: {
        type: [String]
    },
    gender: {
        type: String
    }
})

module.exports = User.discriminator('Volunteer', VolunteerSchema)