/**
 * Chirpy calls mermaid.initialize() with the correct site theme.
 * We only run pending diagrams and attach the viewer — do not override theme.
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

  function attachViewer() {
    if (window.MermaidViewer && typeof window.MermaidViewer.attachAll === 'function') {
      window.MermaidViewer.attachAll();
    }
  }

  function runMermaid() {
    if (typeof mermaid === 'undefined') {
      return Promise.resolve();
    }

    shimInit();

    const nodes = document.querySelectorAll('pre.mermaid:not([data-processed])');
    if (!nodes.length) {
      attachViewer();
      return Promise.resolve();
    }

    if (typeof mermaid.run === 'function') {
      return Promise.resolve(mermaid.run({ nodes: [...nodes] }));
    }
    if (typeof mermaid.init === 'function') {
      return Promise.resolve(mermaid.init(null, 'pre.mermaid'));
    }
    return Promise.resolve();
  }

  function render() {
    const start = () => {
      runMermaid().then(attachViewer).catch(attachViewer);
    };

    if (document.fonts && document.fonts.ready) {
      const timeout = setTimeout(start, 2500);
      document.fonts.ready.then(() => {
        clearTimeout(timeout);
        start();
      });
    } else {
      start();
    }
  }

  render();

  // Re-run when Chirpy toggles light/dark (it updates data-mode and re-inits mermaid).
  const observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'data-mode') {
        setTimeout(function () {
          runMermaid().then(attachViewer).catch(attachViewer);
        }, 50);
        break;
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-mode'],
  });
})();
