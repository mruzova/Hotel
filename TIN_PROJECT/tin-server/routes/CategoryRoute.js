const express = require('express');

const router = express.Router();
const { validationRules, validate } = require('../validators/categoryValidator');
const api = require('../api/CategoryApi');
router.get('/', api.getCategories);
router.post('/', validationRules(), validate, api.createCategory);
router.put('/:idCategory', validationRules(), validate, api.updateCategory);
router.delete('/:idCategory', api.deleteCategory);
module.exports = router;