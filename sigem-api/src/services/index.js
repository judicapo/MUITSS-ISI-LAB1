const mothership = require('./mothership/mothership.service.js');
const ship = require('./ship/ship.service.js');
const passenger = require('./passenger/passenger.service.js');
const trip = require('./trip/trip.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(mothership);
  app.configure(ship);
  app.configure(passenger);
  app.configure(trip);
};
