const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/')
    .get(usersController.getAllUsers)
    .delete(usersController.deleteUser)

router.route('/:emailAddress')
    .get(usersController.getUserByEmailAddress)

router.route('/organizers')
    .post(usersController.createNewOrganizer)

module.exports = router