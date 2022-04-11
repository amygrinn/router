const { serve, writeTestCase, assertVisible, assertHidden } = require('./util');

describe('Relative routes', () => {
  const router = {
    pages: [
      {
        path: '/a',
        children: ['/b', '/d'],
      },
    ],
  };
  const tests = [
    {
      test: '^/a',
      child: 'b',
    },
    {
      test: '^/a',
      child: 'd',
    },
  ];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  describe('Current route: /a/b', () => {
    before(writeTestCase(router, '/a/b', tests));
    it(`Hides '^/a -> d'`, assertHidden('d'));
    it(`Shows '^/a -> b'`, assertVisible('b'));
  });

  describe('Current route: /a/d', () => {
    before(writeTestCase(router, '/a/d', tests));
    it(`Hides '^/a -> b'`, assertHidden('b'));
    it(`Shows '^/a -> d'`, assertVisible('d'));
  });
});
