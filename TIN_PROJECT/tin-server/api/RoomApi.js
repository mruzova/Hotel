const RoomRepo = require('../repos/RoomRepo');
exports.getRooms = (req, res, next) => {
    const page = req.query.page;
    RoomRepo.getRooms(page)
        .then(room => { res.status(200).json(room) })
        .catch(err => { console.log(err) });
}
exports.createRoom = (req, res, next) => {
    RoomRepo.createRoom(req.body)
        .then(newRoom => {
            res.status(201).json(newRoom);
        })
        .catch(err => {
            next(err);
        });
};
exports.updateRoom = (req, res, next) => {
    const id = req.params.idRoom;
    RoomRepo.updateRoom(id, req.body)
        .then(result => {
            res.status(200).json({ room: result });
        })
        .catch(err => {
            next(err);
        });
};
exports.deleteRoom = (req, res, next) => {
    const id = req.params.idRoom;
    RoomRepo.deleteRoom(id)
        .then(result => {
            res.status(200).json({ room: result });
        })
        .catch(err => {
            next(err);
        });
};
exports.getRoomById = (req, res, next) => {
    const id = req.params.idRoom;
    RoomRepo.getRoomById(id).then(result => {
            res.status(200).json({ room: result });
        })
        .catch(err => {
            next(err);
        });
}