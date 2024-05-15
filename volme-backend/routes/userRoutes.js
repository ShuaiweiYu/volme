const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/')
    .get(usersController.getAllUsers)
    .patch(usersController.updateUserCredential)
    .delete(usersController.deleteUser)

router.route('/:emailAddress')
    .get(usersController.getUserByEmailAddress)

router.route('/organizers')
    .post(usersController.createNewOrganizer)
    .patch(usersController.updateOrganizerInfo)

router.route('/organizers/payment')
    .patch(usersController.updateOrganizerPaymentInfo)

router.route('/volunteers')
    .post(usersController.createNewVolunteer)
    .patch(usersController.updateVolunteerInfo)

module.exports = router