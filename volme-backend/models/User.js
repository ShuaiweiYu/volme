class User {
    constructor(emailAdresse, username, hashedPassword, role) {
        this.emailAdresse = emailAdresse;
        this.username = username;
        this.hashedPassword = hashedPassword;
        this.role = role;
        this.profilePicturePath = "";
        this.phoneNumber = "";
    }

    setProfilePicturePath(path) {
        this.profilePicturePath = path;
    }

    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}

module.exports = User;
