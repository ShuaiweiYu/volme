const express = require('express')
const router = express.Router()
const codeController = require('../controllers/codeController')

router.route('/')
    .post(codeController.generateRegistrationCode)

router.route('/:id')
    .get(codeController.getCodeBtId)
    .patch(codeController.invalidateCode)

router.route('/check/:id')
    .post(codeController.checkCodeValidity)

module.exports = router