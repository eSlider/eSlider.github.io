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

  function normalizeSvg(container) {
    const svg = container.querySelector('svg');
    if (!svg || svg.dataset.normalized === 'true') {
      return svg;
    }

    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.style.removeProperty('max-width');

    const viewBox = svg.getAttribute('viewBox');
    if (viewBox) {
      const parts = viewBox.trim().split(/[\s,]+/).map(Number);
      if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
        svg.style.width = parts[2] + 'px';
        svg.style.height = parts[3] + 'px';
      }
    }

    svg.style.maxWidth = 'none';
    svg.style.height = 'auto';
    svg.dataset.normalized = 'true';
    return svg;
  }

  function applyTransform(stage, state) {
    const inner = stage.querySelector('.mermaid-inner');
    if (!inner) {
      return;
    }
    inner.style.transform =
      'translate(' + state.x + 'px, ' + state.y + 'px) scale(' + state.scale + ')';
  }

  function fitToStage(stage, state) {
    const inner = stage.querySelector('.mermaid-inner');
    const svg = inner && inner.querySelector('svg');
    if (!inner || !svg) {
      return;
    }

    normalizeSvg(inner);

    const stageW = stage.clientWidth - 24;
    const stageH = stage.clientHeight - 24;
    const svgW = svg.getBoundingClientRect().width;
    const svgH = svg.getBoundingClientRect().height;

    if (!stageW || !stageH || !svgW || !svgH) {
      return;
    }

    const scale = Math.min(stageW / svgW, stageH / svgH, 1);
    if (scale < 1) {
      state.scale = scale;
      state.x = 0;
      state.y = 0;
      applyTransform(stage, state);
    }
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

  function bindToolbar(toolbar, state, stage, onExpand, fitOnReset) {
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
        applyTransform(stage, state);
        if (fitOnReset) {
          requestAnimationFrame(function () {
            fitToStage(stage, state);
          });
        }
        return;
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

    const inner = clone.querySelector('.mermaid-inner');
    if (inner) {
      inner.style.transform = '';
      const svg = inner.querySelector('svg');
      if (svg) {
        svg.dataset.normalized = 'false';
      }
    }

    return clone;
  }

  function wireFigure(figure, options) {
    const stage = figure.querySelector('.mermaid-stage');
    const toolbar = figure.querySelector('.mermaid-toolbar');
    const inner = figure.querySelector('.mermaid-inner');
    const state = createState();

    normalizeSvg(inner || figure);
    applyTransform(stage, state);

    if (options.fit) {
      requestAnimationFrame(function () {
        fitToStage(stage, state);
      });
    }

    bindPan(stage, state);
    bindToolbar(
      toolbar,
      state,
      stage,
      function () {
        openLightbox(figure);
      },
      options.fit
    );

    if (options.openOnClick) {
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

    box.hidden = false;
    document.body.classList.add('mermaid-lightbox-open');

    wireFigure(clone, { fit: true, openOnClick: false });
  }

  function wrapDiagram(container) {
    if (container.dataset.viewerReady === 'true' || container.closest('.mermaid-figure')) {
      return;
    }
    if (!container.querySelector('svg')) {
      return;
    }

    container.dataset.viewerReady = 'true';
    normalizeSvg(container);

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

    wireFigure(figure, { fit: true, openOnClick: true });
  }

  function attachAll() {
    document.querySelectorAll('pre.mermaid, div.mermaid').forEach(wrapDiagram);
  }

  window.MermaidViewer = { attachAll, closeLightbox };
})();
