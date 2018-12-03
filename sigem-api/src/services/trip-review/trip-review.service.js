// Initializes the `trip-review` service on path `/trip-review`
const createService = require('feathers-sequelize');
const createModel = require('../../models/trip-review.model');
const hooks = require('./trip-review.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/trip-review', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('trip-review');

  service.hooks(hooks);
};
