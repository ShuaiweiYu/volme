const mongoose = require('mongoose');
const {User, UserModel} = require('./User')
const {LANGUAGE} = require('../enums/language')
const {GENDER} = require('../enums/gender')

class Volunteer extends User {
    constructor(emailAddress, username, hashedPassword) {
        super(emailAddress, username, hashedPassword, "VOLUNTEER")
        this.participationCount = 0;
        this.birthday = null;
        this.skills = [];
        this.languages = [];
        this.gender = null;
        this.participatedEvents = []
    }
}

const VolunteerSchema = new mongoose.Schema({
    ...UserModel.schema.obj,
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
    },
    participatedEvents: {
        type: [String],
        required: true,
        default: []
    }
})

const VolunteerModel = UserModel.discriminator('Volunteer', VolunteerSchema)

module.exports = {
    Volunteer,
    VolunteerModel
}