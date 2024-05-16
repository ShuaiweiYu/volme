const {Code, CodeModel} = require('../models/util/Code')
const {CODEUSAGE} = require('../models/enums/CodeUsage')
const asyncHandler = require('express-async-handler')

// @desc Get code by id
// @route GET /codes/:id
const getCodeBtId = asyncHandler(async (req, res) => {
    const { id } = req.patams

    const code = await CodeModel.findById({ id }).lean().exec()

    if (code) {
        res.json(code)
    } else{
        res.status(404).json({ message: 'Code not found' })
    }
})

// @desc Generate a code for user registration
// @route PUT /codes
const generateRegistrationCode = asyncHandler(async (req, res) => {
    const { emailAddress } = req.patams

    if (!emailAddress) {
        return res.status(400).json({ message: 'Field emailAddress is required' })
    }

    const codeObj = new Code(4, CODEUSAGE.REGISTRATION, emailAddress)
    
    const code = await CodeModel.create(codeObj)

    if (code) {
        res.status(201)
    } else {
        res.status(400)
    }

})

// @desc Invalidate a code due to requesting a new code
// @route PATCH /codes/:id
const invalidateCode = asyncHandler(async (req, res) => {
    const { id } = req.patams

    const code = await CodeModel.findById({ id }).lean().exec()

    code.isValid = false

    const updatedCode = await code.save()

    res.status(200)
})

// @desc Generate the code for user registration
// @route GET /codes/check/:id
const checkCodeValidity = asyncHandler(async (req, res) => {
    const { id, emailAddress, inputValue } = req.patams
    
    const code = await CodeModel.findById({ id }).lean().exec()

    if (code.isValid && code.assignTo === emailAddress && code.value === inputValue) {
        res.status(200)
    } else {
        res.status(400)
    }
})

module.exports = {
    getCodeBtId,
    generateRegistrationCode,
    invalidateCode,
    checkCodeValidity
}