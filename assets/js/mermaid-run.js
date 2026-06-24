/**
 * Chirpy calls mermaid.initialize() on load but never mermaid.init()/run().
 * Mermaid v11 removed init(); diagrams only appeared after theme toggle.
 */
(function () {
  'use strict';

  function shimInit() {
    if (typeof mermaid === 'undefined' || typeof mermaid.run !== 'function') {
      return;
    }
    if (typeof mermaid.init !== 'function') {
      mermaid.init = function (_config, selector) {
        return mermaid.run({ querySelector: selector });
      };
    }
  }

  function render() {
    if (typeof mermaid === 'undefined') {
      return;
    }

    shimInit();

    const nodes = document.querySelectorAll('pre.mermaid');
    if (!nodes.length) {
      return;
    }

    const dark =
      document.documentElement.getAttribute('data-mode') === 'dark' ||
      (document.documentElement.getAttribute('data-mode') === null &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    mermaid.initialize({ startOnLoad: false, theme: dark ? 'dark' : 'default' });

    const run = () => {
      if (typeof mermaid.run === 'function') {
        mermaid.run({ nodes: [...nodes] });
      } else if (typeof mermaid.init === 'function') {
        mermaid.init(null, 'pre.mermaid');
      }
    };

    if (document.fonts && document.fonts.ready) {
      const timeout = setTimeout(run, 2500);
      document.fonts.ready.then(() => {
        clearTimeout(timeout);
        run();
      });
    } else {
      run();
    }
  }

  render();
})();
