const { body, validationResult } = require('express-validator')
const validationRules = () => {
    return [
        body('firstName').not().isEmpty(),
        body('lastName').not().isEmpty(),
        body('dateOfBirth').isDate().not().isEmpty(),
        body('country').not().isEmpty(),
        body('city').not().isEmpty(),

    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({
        [err.param]: err.msg
    }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    validationRules,
    validate,
}