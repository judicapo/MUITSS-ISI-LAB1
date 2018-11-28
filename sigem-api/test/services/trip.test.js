const assert = require('assert');
const app = require('../../src/app');

describe('\'trip\' service', () => {
  it('registered the service', () => {
    const service = app.service('trip');

    assert.ok(service, 'Registered the service');
  });
});
