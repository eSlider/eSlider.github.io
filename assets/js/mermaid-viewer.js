/**
 * GitHub-style Mermaid controls: hover toolbar, drag to pan, click to expand.
 * Zoom resizes the SVG (vector) — never CSS scale(), which rasterizes and blurs.
 */
(function () {
  'use strict';

  const ZOOM_STEP = 0.25;
  const ZOOM_MIN = 0.35;
  const ZOOM_MAX = 5;
  const CLICK_TOLERANCE = 6;

  function createToolbar(includeFullscreen) {
    const toolbar = document.createElement('div');
    toolbar.className = 'mermaid-toolbar';
    toolbar.setAttribute('role', 'toolbar');
    toolbar.setAttribute('aria-label', 'Diagram controls');
    const buttons = [
      '<button type="button" class="mermaid-btn" data-action="zoom-in" title="Zoom in" aria-label="Zoom in">+</button>',
      '<button type="button" class="mermaid-btn" data-action="zoom-out" title="Zoom out" aria-label="Zoom out">−</button>',
      '<button type="button" class="mermaid-btn" data-action="reset" title="Reset view" aria-label="Reset view">⟲</button>',
    ];
    if (includeFullscreen) {
      buttons.push(
        '<button type="button" class="mermaid-btn" data-action="fullscreen" title="Fullscreen" aria-label="Fullscreen">⛶</button>'
      );
    }
    buttons.push(
      '<button type="button" class="mermaid-btn" data-action="expand" title="Expand" aria-label="Expand diagram">⤢</button>'
    );
    toolbar.innerHTML = buttons.join('');
    return toolbar;
  }

  function createState() {
    return { scale: 1, x: 0, y: 0, baseW: 0, baseH: 0, autoFit: true };
  }

  function stagePadding(stage) {
    const style = getComputedStyle(stage);
    return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  }

  function parseViewBox(svg) {
    const viewBox = svg.getAttribute('viewBox');
    if (!viewBox) {
      return null;
    }
    const parts = viewBox.trim().split(/[\s,]+/).map(Number);
    if (parts.length !== 4 || parts[2] <= 0 || parts[3] <= 0) {
      return null;
    }
    return { width: parts[2], height: parts[3] };
  }

  function normalizeSvg(container) {
    const svg = container.querySelector('svg');
    if (!svg) {
      return null;
    }

    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.style.removeProperty('max-width');
    svg.style.maxWidth = 'none';
    svg.style.maxHeight = 'none';
    svg.style.display = 'block';
    return svg;
  }

  function initSvgMetrics(inner, state) {
    const svg = normalizeSvg(inner);
    if (!svg) {
      return null;
    }

    if (state.baseW > 0 && state.baseH > 0) {
      return svg;
    }

    const box = parseViewBox(svg);
    if (box) {
      state.baseW = box.width;
      state.baseH = box.height;
      return svg;
    }

    const rect = svg.getBoundingClientRect();
    state.baseW = rect.width || 800;
    state.baseH = rect.height || 600;
    return svg;
  }

  /** Pan only — zoom is applied by resizing the SVG so text stays vector-crisp. */
  function applyView(stage, state) {
    const inner = stage.querySelector('.mermaid-inner');
    const svg = inner && inner.querySelector('svg');
    if (!inner || !svg || !state.baseW || !state.baseH) {
      return;
    }

    const width = Math.max(1, Math.round(state.baseW * state.scale));
    const height = Math.max(1, Math.round(state.baseH * state.scale));
    svg.style.width = width + 'px';
    svg.style.height = height + 'px';
    inner.style.transform = 'translate(' + state.x + 'px, ' + state.y + 'px)';
  }

  function fitToStage(stage, state, fitOptions) {
    const inner = stage.querySelector('.mermaid-inner');
    if (!inner || !initSvgMetrics(inner, state)) {
      return;
    }

    const pad = stagePadding(stage);
    const stageW = stage.clientWidth - pad;
    if (!stageW) {
      return;
    }

    let fitScale = stageW / state.baseW;
    if (fitOptions.mode === 'contain') {
      const stageH = stage.clientHeight - pad;
      if (!stageH) {
        return;
      }
      fitScale = Math.min(stageW / state.baseW, stageH / state.baseH);
    }

    const maxScale = fitOptions.allowUpscale ? ZOOM_MAX : 1;
    state.scale = Math.min(Math.max(fitScale, ZOOM_MIN), maxScale);
    state.x = 0;
    state.y = 0;
    state.autoFit = true;
    applyView(stage, state);
  }

  function bindResize(stage, state, fitOptions) {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(function () {
      if (state.autoFit) {
        fitToStage(stage, state, fitOptions);
      }
    });
    observer.observe(stage);
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
      state.autoFit = false;
      state.x = origX + dx;
      state.y = origY + dy;
      applyView(stage, state);
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

  function bindToolbar(toolbar, state, stage, options) {
    toolbar.addEventListener('click', function (event) {
      const button = event.target.closest('[data-action]');
      if (!button) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();

      const action = button.dataset.action;
      if (action === 'zoom-in') {
        state.autoFit = false;
        state.scale = Math.min(ZOOM_MAX, state.scale + ZOOM_STEP);
      } else if (action === 'zoom-out') {
        state.autoFit = false;
        state.scale = Math.max(ZOOM_MIN, state.scale - ZOOM_STEP);
      } else if (action === 'reset') {
        state.scale = 1;
        state.x = 0;
        state.y = 0;
        applyView(stage, state);
        if (options.fit) {
          requestAnimationFrame(function () {
            fitToStage(stage, state, options.fitOptions);
          });
        }
        return;
      } else if (action === 'fullscreen') {
        options.onFullscreen();
        return;
      } else if (action === 'expand') {
        options.onExpand();
        return;
      }
      applyView(stage, state);
    });
  }

  let lightbox = null;
  let activeDialog = null;

  function updateFullscreenButton(dialog) {
    const button = dialog.querySelector('[data-action="fullscreen"]');
    if (!button) {
      return;
    }
    const isFs = document.fullscreenElement === dialog;
    button.title = isFs ? 'Exit fullscreen' : 'Fullscreen';
    button.setAttribute('aria-label', button.title);
    button.textContent = isFs ? '⛶' : '⛶';
  }

  function ensureLightbox() {
    if (lightbox) {
      return lightbox;
    }

    lightbox = document.createElement('div');
    lightbox.className = 'mermaid-lightbox';
    lightbox.hidden = true;
    lightbox.innerHTML = [
      '<div class="mermaid-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Diagram viewer">',
      '  <div class="mermaid-lightbox-header">',
      '    <span class="mermaid-lightbox-title">Diagram</span>',
      '    <div class="mermaid-lightbox-actions">',
      '      <button type="button" class="mermaid-btn" data-action="fullscreen" title="Fullscreen" aria-label="Fullscreen">⛶</button>',
      '      <button type="button" class="mermaid-btn mermaid-lightbox-close" data-action="close" aria-label="Close">×</button>',
      '    </div>',
      '  </div>',
      '  <div class="mermaid-lightbox-body"></div>',
      '</div>',
    ].join('');
    document.body.appendChild(lightbox);

    const dialog = lightbox.querySelector('.mermaid-lightbox-dialog');
    activeDialog = dialog;

    lightbox.addEventListener('click', function (event) {
      if (event.target.dataset.action === 'close') {
        closeLightbox();
      }
      if (event.target.dataset.action === 'fullscreen') {
        toggleFullscreen(dialog);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && lightbox && !lightbox.hidden) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(function () {
            closeLightbox();
          });
        } else {
          closeLightbox();
        }
      }
    });

    document.addEventListener('fullscreenchange', function () {
      if (!lightbox || lightbox.hidden) {
        return;
      }
      updateFullscreenButton(dialog);
      const figure = lightbox.querySelector('.mermaid-figure--lightbox');
      const stage = figure && figure.querySelector('.mermaid-stage');
      if (stage) {
        requestAnimationFrame(function () {
          const state = figure._mermaidState;
          if (state) {
            fitToStage(stage, state, { mode: 'contain', allowUpscale: true });
          }
        });
      }
    });

    return lightbox;
  }

  function toggleFullscreen(dialog) {
    if (document.fullscreenElement === dialog) {
      document.exitFullscreen().catch(function () {});
      return;
    }
    if (dialog.requestFullscreen) {
      dialog.requestFullscreen().catch(function () {});
    }
  }

  function closeLightbox() {
    if (!lightbox) {
      return;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(function () {});
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
        svg.style.width = '';
        svg.style.height = '';
      }
    }

    return clone;
  }

  function wireFigure(figure, options) {
    const stage = figure.querySelector('.mermaid-stage');
    const toolbar = figure.querySelector('.mermaid-toolbar');
    const inner = figure.querySelector('.mermaid-inner');
    const state = createState();

    initSvgMetrics(inner || figure, state);
    figure._mermaidState = state;

    const fitOptions = options.fitOptions || { mode: 'width', allowUpscale: false };

    if (options.fit) {
      requestAnimationFrame(function () {
        fitToStage(stage, state, fitOptions);
        bindResize(stage, state, fitOptions);
      });
    } else {
      applyView(stage, state);
    }

    bindPan(stage, state);
    bindToolbar(toolbar, state, stage, {
      fit: options.fit,
      fitOptions: fitOptions,
      onExpand: function () {
        openLightbox(figure);
      },
      onFullscreen: function () {
        if (activeDialog) {
          toggleFullscreen(activeDialog);
        }
      },
    });

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
    const dialog = box.querySelector('.mermaid-lightbox-dialog');
    body.replaceChildren();

    const clone = cloneFigure(figure);
    body.appendChild(clone);

    box.hidden = false;
    document.body.classList.add('mermaid-lightbox-open');

    wireFigure(clone, {
      fit: true,
      openOnClick: false,
      fitOptions: { mode: 'contain', allowUpscale: true },
    });

    requestAnimationFrame(function () {
      if (dialog.requestFullscreen) {
        dialog.requestFullscreen().catch(function () {});
      }
    });
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

    const toolbar = createToolbar(false);
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

    wireFigure(figure, {
      fit: true,
      openOnClick: true,
      fitOptions: { mode: 'width', allowUpscale: false },
    });
  }

  function attachAll() {
    document.querySelectorAll('pre.mermaid, div.mermaid').forEach(wrapDiagram);
  }

  window.MermaidViewer = { attachAll, closeLightbox };
})();
