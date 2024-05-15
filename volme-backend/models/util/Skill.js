const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class Skill {
    constructor(skillName) {
        this.skillName = skillName.trim().toLowerCase()
        // todo: maybe we should use NLP library to avoid synonym
        this.count = 0
    }
}

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

const SkillModel = mongoose.model('Skill', skillSchema);

module.exports = {
    Skill,
    SkillModel
}