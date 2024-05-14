const UserSchema = require('../models/UserSchema')
const OrganizerSchema = require('../models/OrganizerSchema')
const Organizer = require('../models/Organizer')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await UserSchema.find().select('-password').lean()
    
    // If no users
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Get all users
// @route GET /users/:emailAdresse
const getUserByEmailAdresse = asyncHandler(async (req, res) => {
    const {emailAdresse} = req.params

    const user = await User.findOne({ emailAdresse }).select('-hashedPassword').lean().exec()

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: 'User not found' })
    }
})

// // @desc Create new organizer
// // @route POST /users/organizer
const createNewOrganizer = asyncHandler(async (req, res) => {
    const { emailAdresse, username, password } = req.body

    // Confirm data
    if (!emailAdresse || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate emailAdresse
    const duplicate = await UserSchema.findOne({ emailAdresse }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate emailAdresse' })
    }

    // Hash Password
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const organizerObj = new Organizer(emailAdresse, username, hashedPwd)

    // Create and store new user
    const organizer = await OrganizerSchema.create(organizerObj)

    if (organizer) { //created
        res.status(201).json({ message: `New organizer ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// // @desc Update a organizer
// // @route PATCH /users/organizer
const updateUser = asyncHandler(async (req, res) => {
    const { id, emailAdresse, username, profilePicturePath, phoneNumber, contactInfo, billingInfo } = req.body

    // Confirm data
    if (!id || !emailAdresse || !username || !profilePicturePath || !phoneNumber || !contactInfo || !billingInfo) {
        return res.status(400).json({ message: 'All fields except hashedPassword are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate
    const duplicate = await User.findOne({ emailAdresse }).lean().exec()

    // Allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate emailAdresse' })
    }

    //todo

    res.json({ message: `${updatedUser.username} updated` })
})

// // @desc Delete a user
// // @route DELETE /users
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'User has assigned notes' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    getUserByEmailAdresse,
    createNewOrganizer,
    deleteUser
}