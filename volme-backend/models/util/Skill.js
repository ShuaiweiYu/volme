class Skill {
    constructor(skillName) {
        this.skillName = skillName.trim().toLowerCase()
        // todo: maybe we should use NLP library to avoid synonym
        this.count = 0
    }
}