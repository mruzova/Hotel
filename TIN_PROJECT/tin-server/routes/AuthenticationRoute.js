const express = require('express');
const router = express.Router();
const api = require('../api/AuthenticationApi');
const { validationRules, validate } = require('../validators/authValidator');
router.post('/', validationRules(), validate, api.authenticate);

module.exports = router;