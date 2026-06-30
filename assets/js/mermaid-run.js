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

  function scheduleAttachViewer() {
    attachViewer();
    requestAnimationFrame(attachViewer);
    setTimeout(attachViewer, 50);
    setTimeout(attachViewer, 250);
    setTimeout(attachViewer, 1000);
  }

  function runMermaid() {
    if (typeof mermaid === 'undefined') {
      scheduleAttachViewer();
      return Promise.resolve();
    }

    shimInit();

    const nodes = document.querySelectorAll('pre.mermaid:not([data-processed])');
    if (!nodes.length) {
      scheduleAttachViewer();
      return Promise.resolve();
    }

    let promise;
    if (typeof mermaid.run === 'function') {
      promise = Promise.resolve(mermaid.run({ nodes: [...nodes] }));
    } else if (typeof mermaid.init === 'function') {
      promise = Promise.resolve(mermaid.init(null, 'pre.mermaid'));
    } else {
      scheduleAttachViewer();
      return Promise.resolve();
    }

    return promise.then(scheduleAttachViewer).catch(scheduleAttachViewer);
  }

  function render() {
    const start = () => {
      runMermaid().catch(scheduleAttachViewer);
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

  window.addEventListener('load', scheduleAttachViewer);

  const postRoot =
    document.querySelector('.post-content') ||
    document.querySelector('article') ||
    document.querySelector('main');
  if (postRoot && typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function () {
      scheduleAttachViewer();
    });
    observer.observe(postRoot, { childList: true, subtree: true });
  }

  // Re-run when Chirpy toggles light/dark (it updates data-mode and re-inits mermaid).
  const themeObserver = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'data-mode') {
        setTimeout(function () {
          runMermaid().catch(scheduleAttachViewer);
        }, 50);
        break;
      }
    }
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-mode'],
  });
})();
