const assert = require('assert');
const app = require('../../src/app');

describe('\'ship\' service', () => {
  it('registered the service', () => {
    const service = app.service('ship');

    assert.ok(service, 'Registered the service');
  });
});
