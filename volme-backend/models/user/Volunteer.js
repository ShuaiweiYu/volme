const User = require('./User')
const {LANGUAGE} = require('./enums/language')
const {GENDER} = require('./enums/gender')

class Volunteer extends User {
    constructor(emailAddress, username, hashedPassword) {
        super(emailAddress, username, hashedPassword, "VOLUNTEER")
        this.participationCount = 0;
        this.birthday = null;
        this.skills = [];
        this.languages = [];
        this.gender = null;
    }
}

module.exports = Volunteer