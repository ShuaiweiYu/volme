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
// @route GET /users/:emailAddress
const getUserByEmailAddress = asyncHandler(async (req, res) => {
    const {emailAddress} = req.params

    const user = await User.findOne({ emailAddress }).select('-hashedPassword').lean().exec()

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: 'User not found' })
    }
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

// // @desc Create new organizer
// // @route POST /users/organizer
const createNewOrganizer = asyncHandler(async (req, res) => {
    const { emailAddress, username, password } = req.body

    // Confirm data
    if (!emailAddress || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate emailAddress
    const duplicate = await UserSchema.findOne({ emailAddress }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate emailAddress' })
    }

    // Hash Password
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const organizerObj = new Organizer(emailAddress, username, hashedPwd)

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
const updateOrganizerInfo = asyncHandler(async (req, res) => {
    const { emailAddress, profilePicturePath, phoneNumber, contactInfo, billingInfo } = req.body

    // Confirm data
    if ( !profilePicturePath || !phoneNumber || !contactInfo || !billingInfo) {
        return res.status(400).json({ message: 'emailAddress, profilePicturePath, phoneNumber, contactInfo, billingInfo fields are required' })
    }

    // Check for duplicate
    const organizer = await OrganizerSchema.findOne({ emailAddress }).lean().exec()

    if (!organizer) {
        return res.status(400).json({ message: 'Organizer not found' })
    }

    organizer.profilePicturePath = profilePicturePath
    organizer.phoneNumber = phoneNumber
    organizer.contactInfo(contactInfo)
    organizer.billingInfo(billingInfo)

    const updatedUser = await organizer.save()

    res.json({ message: `${updatedUser.username} updated` })
})


module.exports = {
    getAllUsers,
    getUserByEmailAddress,
    createNewOrganizer,
    deleteUser
}