const { serve, writeTestCase, assertVisible, assertHidden } = require('./util');

describe('Absolute routes', () => {
  const router = { pages: ['/a', '/b', '/c'] };
  const tests = ['/a', '/b', '/c'];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  describe('Current route: /a', () => {
    before(writeTestCase(router, '/a', tests));
    it(`Shows '/a'`, assertVisible('/a'));
    it(`Hides '/b' and '/c'`, assertHidden('/b', '/c'));
  });
});
