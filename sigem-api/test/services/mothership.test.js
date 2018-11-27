const assert = require('assert');
const app = require('../../src/app');

describe('\'mothership\' service', () => {
  it('registered the service', () => {
    const service = app.service('mothership');

    assert.ok(service, 'Registered the service');
  });
});
