const { serve, writeTestCase, assertVisible, assertHidden } = require('./util');

describe('Relative grandchildren', () => {
  const router = {
    pages: [
      {
        path: '/a',
        children: [
          {
            path: '/b',
            children: ['/c', '/d'],
          },
        ],
      },
    ],
  };
  const tests = [
    {
      test: '^/a',
      child: 'b/c',
    },
    {
      test: '^/a',
      child: 'b/d',
    },
    {
      test: '^/a/b',
      child: 'c',
    },
    {
      test: '^/a/b',
      child: 'd',
    },
  ];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  describe('Current route: /a/b/c', () => {
    beforeEach(writeTestCase(router, '/a/b/c', tests));
    it(`Shows '^/a -> b/c'`, assertVisible('b/c'));
    it(`Shows '^/a/b -> c'`, assertVisible('c'));
    it(`Hides '^/a -> b/d' and '^/a/b -> d'`, assertHidden('b/d', 'd'));
  });

  describe('Current route: /a/b/d', () => {
    beforeEach(writeTestCase(router, '/a/b/d', tests));
    it(`Hides '^/a -> b/c' and '^/a/b -> c'`, assertHidden('b/c', 'c'));
    it(`Shows '^/a -> b/d'`, assertVisible('b/d'));
    it(`Shows '^/a/b -> d'`, assertVisible('d'));
  });
});
