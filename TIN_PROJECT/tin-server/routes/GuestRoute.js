const express = require('express');
const router = express.Router();
const api = require('../api/GuestApi');
const { validationRules, validate } = require('../validators/guestValidator');
router.get('/', api.getGuests);
router.get('/:id', api.getAuthorizedUserData);
//router.post('/', api.createGuest); //deleted since user won't be able to create guest independently, only via registration after creating user!
router.put('/:idGuest', validationRules(), validate, api.updateGuest);
router.delete('/:idGuest', api.deleteGuest);
module.exports = router;