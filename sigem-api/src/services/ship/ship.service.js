// Initializes the `ship` service on path `/ship`
const createService = require('feathers-sequelize');
const createModel = require('../../models/ship.model');
const hooks = require('./ship.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/ship', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('ship');

  service.hooks(hooks);
};
