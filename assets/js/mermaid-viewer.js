/**
 * GitHub-style Mermaid controls: hover toolbar, drag to pan, click to expand.
 */
(function () {
  'use strict';

  const ZOOM_STEP = 0.25;
  const ZOOM_MIN = 0.35;
  const ZOOM_MAX = 5;
  const CLICK_TOLERANCE = 6;

  function createToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'mermaid-toolbar';
    toolbar.setAttribute('role', 'toolbar');
    toolbar.setAttribute('aria-label', 'Diagram controls');
    toolbar.innerHTML = [
      '<button type="button" class="mermaid-btn" data-action="zoom-in" title="Zoom in" aria-label="Zoom in">+</button>',
      '<button type="button" class="mermaid-btn" data-action="zoom-out" title="Zoom out" aria-label="Zoom out">−</button>',
      '<button type="button" class="mermaid-btn" data-action="reset" title="Reset view" aria-label="Reset view">⟲</button>',
      '<button type="button" class="mermaid-btn" data-action="expand" title="Expand" aria-label="Expand diagram">⤢</button>',
    ].join('');
    return toolbar;
  }

  function createState() {
    return { scale: 1, x: 0, y: 0 };
  }

  function applyTransform(stage, state) {
    const inner = stage.querySelector('.mermaid-inner');
    if (!inner) {
      return;
    }
    inner.style.transform = 'translate(' + state.x + 'px, ' + state.y + 'px) scale(' + state.scale + ')';
  }

  function bindPan(stage, state) {
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let origX = 0;
    let origY = 0;
    let moved = false;

    stage.addEventListener('pointerdown', function (event) {
      if (event.button !== 0 || event.target.closest('.mermaid-toolbar')) {
        return;
      }
      dragging = true;
      moved = false;
      startX = event.clientX;
      startY = event.clientY;
      origX = state.x;
      origY = state.y;
      stage.setPointerCapture(event.pointerId);
      stage.classList.add('is-dragging');
    });

    stage.addEventListener('pointermove', function (event) {
      if (!dragging) {
        return;
      }
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.hypot(dx, dy) > CLICK_TOLERANCE) {
        moved = true;
      }
      state.x = origX + dx;
      state.y = origY + dy;
      applyTransform(stage, state);
    });

    function endDrag(event) {
      if (!dragging) {
        return;
      }
      dragging = false;
      stage.classList.remove('is-dragging');
      try {
        stage.releasePointerCapture(event.pointerId);
      } catch (_error) {
        /* ignore */
      }
      stage.dataset.moved = moved ? '1' : '0';
    }

    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);
  }

  function bindToolbar(toolbar, state, stage, onExpand) {
    toolbar.addEventListener('click', function (event) {
      const button = event.target.closest('[data-action]');
      if (!button) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();

      const action = button.dataset.action;
      if (action === 'zoom-in') {
        state.scale = Math.min(ZOOM_MAX, state.scale + ZOOM_STEP);
      } else if (action === 'zoom-out') {
        state.scale = Math.max(ZOOM_MIN, state.scale - ZOOM_STEP);
      } else if (action === 'reset') {
        state.scale = 1;
        state.x = 0;
        state.y = 0;
      } else if (action === 'expand') {
        onExpand();
        return;
      }
      applyTransform(stage, state);
    });
  }

  let lightbox = null;

  function ensureLightbox() {
    if (lightbox) {
      return lightbox;
    }

    lightbox = document.createElement('div');
    lightbox.className = 'mermaid-lightbox';
    lightbox.hidden = true;
    lightbox.innerHTML = [
      '<div class="mermaid-lightbox-backdrop" data-action="close"></div>',
      '<div class="mermaid-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Diagram viewer">',
      '  <div class="mermaid-lightbox-header">',
      '    <span class="mermaid-lightbox-title">Diagram</span>',
      '    <button type="button" class="mermaid-btn mermaid-lightbox-close" data-action="close" aria-label="Close">×</button>',
      '  </div>',
      '  <div class="mermaid-lightbox-body"></div>',
      '</div>',
    ].join('');
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', function (event) {
      if (
        event.target.dataset.action === 'close' ||
        event.target.classList.contains('mermaid-lightbox-backdrop')
      ) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && lightbox && !lightbox.hidden) {
        closeLightbox();
      }
    });

    return lightbox;
  }

  function closeLightbox() {
    if (!lightbox) {
      return;
    }
    lightbox.hidden = true;
    document.body.classList.remove('mermaid-lightbox-open');
    lightbox.querySelector('.mermaid-lightbox-body').replaceChildren();
  }

  function cloneFigure(figure) {
    const clone = figure.cloneNode(true);
    clone.classList.add('mermaid-figure--lightbox');
    clone.querySelector('.mermaid-hint')?.remove();
    return clone;
  }

  function wireFigure(figure, openOnClick) {
    const stage = figure.querySelector('.mermaid-stage');
    const toolbar = figure.querySelector('.mermaid-toolbar');
    const state = createState();

    applyTransform(stage, state);
    bindPan(stage, state);
    bindToolbar(toolbar, state, stage, function () {
      openLightbox(figure);
    });

    if (openOnClick) {
      stage.addEventListener('click', function (event) {
        if (event.target.closest('.mermaid-toolbar')) {
          return;
        }
        if (stage.dataset.moved === '1') {
          stage.dataset.moved = '0';
          return;
        }
        openLightbox(figure);
      });
    }
  }

  function openLightbox(figure) {
    const box = ensureLightbox();
    const body = box.querySelector('.mermaid-lightbox-body');
    body.replaceChildren();

    const clone = cloneFigure(figure);
    body.appendChild(clone);
    wireFigure(clone, false);

    box.hidden = false;
    document.body.classList.add('mermaid-lightbox-open');
  }

  function wrapDiagram(container) {
    if (container.dataset.viewerReady === 'true' || container.closest('.mermaid-figure')) {
      return;
    }
    if (!container.querySelector('svg')) {
      return;
    }

    container.dataset.viewerReady = 'true';

    const figure = document.createElement('figure');
    figure.className = 'mermaid-figure';
    figure.tabIndex = 0;

    const toolbar = createToolbar();
    const stage = document.createElement('div');
    stage.className = 'mermaid-stage';

    const inner = document.createElement('div');
    inner.className = 'mermaid-inner';

    const hint = document.createElement('figcaption');
    hint.className = 'mermaid-hint';
    hint.textContent = 'Hover for controls · drag to pan · click to expand';

    container.parentNode.insertBefore(figure, container);
    figure.append(toolbar, stage, hint);
    stage.appendChild(inner);
    inner.appendChild(container);

    wireFigure(figure, true);
  }

  function attachAll() {
    document.querySelectorAll('pre.mermaid, div.mermaid').forEach(wrapDiagram);
  }

  window.MermaidViewer = { attachAll, closeLightbox };
})();
