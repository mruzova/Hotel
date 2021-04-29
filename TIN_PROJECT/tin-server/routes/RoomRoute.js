const express = require('express');

const router = express.Router();
const api = require('../api/RoomApi');
const { validationRules, validate } = require('../validators/roomValidator');
router.get('/', api.getRooms);
router.get('/:idRoom', api.getRoomById);
router.post('/', validationRules(), validate, api.createRoom);
router.put('/:idRoom', validationRules(), validate, api.updateRoom);
router.delete('/:idRoom', api.deleteRoom);
module.exports = router;