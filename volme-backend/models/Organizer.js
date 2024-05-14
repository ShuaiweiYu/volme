const User = require('./User')
const { SUBSCRIPTIONTYPE } = require('./enums/subscriptionType');

class Organizer extends User {
    constructor(emailAdresse, username, hashedPassword) {
        super(emailAdresse, username, hashedPassword, "ORGANIZER")
        this.averageRating = -1
        this.contactInfo = ""
        this.isVerified = false
        this.subscriptionType = SUBSCRIPTIONTYPE.FREE
        this.billingInfo = ""
        this.subscriptionValidity = null
    }

    setContactInfo(contactInfo) {
        this.contactInfo = contactInfo
    }

    setBillingInfo(billingInfo) {
        this.billingInfo = billingInfo
    }

    setAverageRating(averageRating) {
        this.averageRating = averageRating
    }

    setSubscriptionType(subscriptionType) {
        this.subscriptionType = subscriptionType
    }

    setSubscriptionValidity(subscriptionValidity) {
        this.subscriptionValidity = subscriptionValidity
    }

    verifyOrganizer() {
        this.isVerified = true
    }

}

module.exports = Organizer