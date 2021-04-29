const GuestRepo = require('../repos/GuestRepo');
exports.getGuests = (req, res, next) => {
    GuestRepo.getGuests()
        .then(guests => { res.status(200).json(guests) })
        .catch(err => { console.log(err) });
}
exports.createGuest = (req, res, next) => {
    GuestRepo.createGuest(req.body)
        .then(newGuest => {
            res.status(201).json(newGuest);
        })
        .catch(err => {
            next(err);
        });
};
exports.updateGuest = (req, res, next) => {
    const id = req.params.idGuest;
    GuestRepo.updateGuest(id, req.body)
        .then(result => {
            res.status(200).json({ guest: result });
        })
        .catch(err => {
            next(err);
        });
};
exports.deleteGuest = (req, res, next) => {
    const id = req.params.idGuest;
    GuestRepo.deleteGuest(id)
        .then(result => {
            res.status(200).json({ guest: result });
        })
        .catch(err => {
            next(err);
        });
};
exports.getAuthorizedUserData = (req, res, next) => {
    const id = req.params.id;
    GuestRepo.getAuthorizedUserData(id)
        .then(result => {
            res.status(200).json({ guest: result });
        })
        .catch(err => {
            next(err);
        });
};