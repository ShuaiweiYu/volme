const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    skillName: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Skill', skillSchema);