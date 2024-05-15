const mongoose = require('mongoose');
const User = require('./UserSchema');

const OrganizerSchema = new mongoose.Schema({
    ...User.schema.obj,
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

module.exports = User.discriminator('Organizer', OrganizerSchema)