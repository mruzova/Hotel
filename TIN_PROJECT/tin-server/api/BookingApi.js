const BookingRepo = require('../repos/BookingRepo');
exports.getReservations = (req, res, next) => {
    BookingRepo.getReservations()
        .then(guests => { res.status(200).json(guests) })
        .catch(err => { console.log(err) });
}
exports.createBooking = (req, res, next) => {
    BookingRepo.createBooking(req.body)
        .then(newBooking => {
            res.status(201).json(newBooking);
        })
        .catch(err => {
            next(err);
        });
};
exports.updateBooking = (req, res, next) => {
    const id = req.params.idBooking;
    BookingRepo.updateBooking(id, req.body)
        .then(result => {
            res.status(200).json(req.body);
        })
        .catch(err => {
            next(err);
        });
};
exports.deleteBooking = (req, res, next) => {
    const id = req.params.idBooking;
    BookingRepo.deleteBooking(id)
        .then(result => {
            res.status(200).json({ booking: result });
        })
        .catch(err => {
            next(err);
        });
};
exports.getReservationsByGuest = (req, res, next) => {
    const id = req.params.idUser;
    BookingRepo.getReservationsByGuest(id)
        .then(result => {
            res.status(200).json({ booking: result });
        })
        .catch(err => {
            next(err);
        });
};