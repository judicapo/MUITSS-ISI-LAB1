const assert = require('assert');
const app = require('../../src/app');

describe('\'trip-review\' service', () => {
  it('registered the service', () => {
    const service = app.service('trip-review');

    assert.ok(service, 'Registered the service');
  });
});
