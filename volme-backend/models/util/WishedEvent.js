const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class WishedEvent {
    // todo: modify this after the creation of event class
    constructor(event) {
        this.eventId = event._id
        if (event.eventDate > new Date()) {
            this.isUpcoming = true
        } else {
            this.isUpcoming = false
        }
        this.requireNotification = false
    }
}

const WishedEventSchema = new Schema({
    eventId: {
        type: String,
        required: true
    },
    isUpcoming: {
        type: Boolean,
        required: true
    },
    requireNotification: {
        type: Boolean,
        required: true
    }
})

const WishedEventModel = mongoose.model('WishedEvent', WishedEventSchema);

module.exports = {
    WishedEvent,
    WishedEventModel
}