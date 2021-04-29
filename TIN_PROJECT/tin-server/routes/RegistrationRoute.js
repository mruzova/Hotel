const express = require('express');
const router = express.Router();
const api = require('../api/RegistrationApi');
const { validationRules, validate } = require('../validators/registrationValidator');
router.post('/', validationRules(), validate, api.register);

module.exports = router;