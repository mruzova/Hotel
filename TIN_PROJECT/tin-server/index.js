const express = require("express");
const app = express();
const port = 8888;
var cors = require('cors');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:4200' }));
const categoryRouter = require('./routes/CategoryRoute');
const roomRouter = require('./routes/RoomRoute');
const bookingRouter = require('./routes/BookingRoute');
const guestRouter = require('./routes/GuestRoute');
const registerRouter = require('./routes/RegistrationRoute');
const authRouter = require('./routes/AuthenticationRoute');
app.use('/api/categories', categoryRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/reservations', bookingRouter);
app.use('/api/guests', guestRouter);
app.use('/api/registration', registerRouter);
app.use('/api/authentication', authRouter);


app.listen(port, () => {
    console.log('running on localhost:' + port);
});