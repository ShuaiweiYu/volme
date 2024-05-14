class User {
    constructor(emailAddress, username, hashedPassword, role) {
        this.emailAddress = emailAddress;
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
