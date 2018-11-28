// Initializes the `trip` service on path `/trip`
const createService = require('feathers-sequelize');
const createModel = require('../../models/trip.model');
const hooks = require('./trip.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/trip', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('trip');

  service.hooks(hooks);
};
