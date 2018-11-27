const mothership = require('./mothership/mothership.service.js');
const ship = require('./ship/ship.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(mothership);
  app.configure(ship);
};
