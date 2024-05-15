const mongoose = require('mongoose');
const {User, UserModel} = require('./User')
const { SUBSCRIPTIONTYPE } = require('./enums/subscriptionType');

class Organizer extends User {
    constructor(emailAddress, username, hashedPassword) {
        super(emailAddress, username, hashedPassword, "ORGANIZER")
        this.averageRating = -1
        this.contactInfo = ""
        this.isVerified = false
        this.subscriptionType = SUBSCRIPTIONTYPE.FREE
        this.billingInfo = ""
        this.subscriptionValidity = null
    }
}

const OrganizerSchema = new mongoose.Schema({
    ...UserModel.schema.obj,
    averageRating: {
        type: Number,
        required: true
    },
    contactInfo: {
        type: String
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    subscriptionType: {
        type: String,
        required: true
    },
    billingInfo: {
        type: String
    },
    subscriptionValidity: {
        type: Date
    }
    
});

const OrganizerModel = UserModel.discriminator('Organizer', OrganizerSchema)

module.exports = {
    Organizer,
    OrganizerModel
}