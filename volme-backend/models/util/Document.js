const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class Document {
    constructor(type, path, userId) {
        this.type = type
        this.path = path
        this.userId = userId
    }
}

const DocumentSchema = new Schema({
    type: {
        type: String,
        required: true
    }, 
    path: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

const DocumentModel = mongoose.model('Document', DocumentSchema)

module.exports = {
    Document,
    DocumentModel
}