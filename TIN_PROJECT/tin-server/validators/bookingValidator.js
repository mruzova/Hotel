const { body, validationResult } = require('express-validator')
const validationRules = () => {
    return [
        body('dateOfArrival').isDate().not().isEmpty(),
        body('dateOfDeparture').isDate().not().isEmpty(),
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