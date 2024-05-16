const express = require('express')
const router = express.Router()
const codeController = require('../controllers/codeController')

router.route('/')
    .put(codeController.generateRegistrationCode)

router.route('/:id')
    .get(codeController.getCodeBtId)
    .patch(codeController.invalidateCode)

router.route('/check/:id')
    .get(codeController.checkCodeValidity)