import React from 'react';
import ReactDOM from 'react-dom';
import useRouter from '../lib';
import './main.scss';
import routerConfig from './router.json';

function App() {
  routerConfig['baseUrl'] = process.env.BASE_URL;
  const [router, goto] = useRouter(routerConfig);

  return (
    <div>
      <div className="flex-col">
        <h1>Tygr Router Example</h1>
        <nav>
          <div>
            <button onClick={goto('/')}>Home (/)</button>
            <button onClick={goto('/page1')}>Page 1 (/page1)</button>
            <button onClick={goto('/page2')}>Page 2 (/page2)</button>
            <button onClick={goto('/i/i0')}>Child 1 (/i/i0)</button>
            <button onClick={goto('/i/i1')}>Child 2 (/i/i1)</button>
            <button onClick={goto('/i/j/j0')}>G-Child 1 (/i/j/j0)</button>
            <button onClick={goto('/i/j/j1')}>G-Child 2 (/i/j/j1)</button>
            <button onClick={goto('/i/j/k/k0')}>G-G-Child 1 (/i/j/k/k0)</button>
            <button onClick={goto('/i/j/k/k1')}>G-G-Child 2 (/i/j/k/k1)</button>
            <button onClick={goto('/non-existing-page')}>
              Fallback (/non-existing/page)
            </button>
            <button onClick={goto('/redirect/absolute')}>
              Absolute Redirect (/redirect/absolute)
            </button>
            <button onClick={goto('/redirect/relative')}>
              Relative Redirect (/redirect/relative)
            </button>
          </div>
        </nav>
        <div className="router" {...router}>
          <div className="flex-wrap info-box max-width-md">
            <h3>Router</h3>
            <span data-route="/404">Fallback page (/404)</span>
            <span data-route="/">Home page (/)</span>
            <span data-route="/page1">Page 1 (/page1)</span>
            <span data-route="/page2">Page 2 (/page2)</span>
            <span data-route="/i/i0">Child 1 (/i/i0)</span>
            <span data-route="/i/i1">Child 2 (/i/i1)</span>
            <span data-route="/i/j/j0">G-Child 1 (/i/j/j0)</span>
            <span data-route="/i/j/j1">G-Child 2 (/i/j/j1)</span>
            <span data-route="/i/j/k/k0">G-G-Child 1 (/i/j/k/k0)</span>
            <span data-route="/i/j/k/k1">G-G-Child 2 (/i/j/k/k1)</span>
          </div>

          <div className="info-box max-width-md flex-col">
            <h4>&quot;Starts with&quot; syntax </h4>
            <p>Display an element on all child paths</p>
            <span data-route="^/i">Any Child (^/i)</span>
            <span data-route="^/i/j">Any G-Child (^/i/j)</span>
          </div>

          <div className="info-box flex-wrap">
            <div className="max-width-md">
              <h3>Partial syntax</h3>
              <p>
                Specify routes relative to the nearest parent element with a
                &apos;data-route&apos; attribute. The most top level parent must
                use the &quot;starts with&quot; syntax.
              </p>
            </div>
            <div className="flex-wrap info-box" data-route="^/i">
              <button className="hide" onClick={goto('./')}>
                Go up (./)
              </button>
              <h4>^/i</h4>
              <div className="flex-col max-width-md">
                <span data-route="i1">Child 2 (i1)</span>
                <span data-route="j/j0">G-Child 1 (j/j0)</span>
                <span data-route="j/j1">G-Child 2 (j/j1)</span>
                <div className="flex-wrap">
                  <span data-route="j/k/k0">G-G-Child 1 (j/k/k0)</span>
                  <span data-route="j/k/k1">G-G-Child 2 (j/k/k1)</span>
                </div>
              </div>
              <div className="info-box max-width-md flex-wrap" data-route="^j">
                <h4>^j</h4>
                <span data-route="j0">G-Child 1 (j0)</span>
                <span data-route="j1">G-Child 2 (j1)</span>
                <span data-route="!j0">Not G-Child 1 (!j0)</span>
                <button
                  className="hide"
                  data-route="j0 j1"
                  onClick={goto('./k/k0')}
                >
                  Relative button (./k/k0)
                </button>
                <div className="info-box flex-wrap" data-route="^k">
                  <h4>^k</h4>
                  <span data-route="k0">G-G-Child 1 (k0)</span>
                  <span data-route="k1">G-G-Child 2 (k1)</span>
                  <button
                    className="hide"
                    data-route="k0 k1"
                    onClick={goto('../j0')}
                  >
                    Relative button (../j0)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="info-box max-width-md flex-col">
            <h3>Exclusionary syntax</h3>
            <span data-route="!/page1">Everywhere except Page 1</span>
            <span data-route="!/page2 !/i/i1">
              Everywhere except Page 2 or Child 2
            </span>
          </div>

          <div className="info-box max-width-md flex-col">
            <h4>Target specific routes for styling</h4>
            <span className="red" data-route="/i/i0">
              I&apos;m red when inactive! (/i/i0)
            </span>
            <span className="blue">I&apos;m blue on Page 2</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.hydrate(<App />, document.getElementById('app'));
