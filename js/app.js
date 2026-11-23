/* Sistema Eléctrico Argentino · Lógica: router, progreso, mapa, glosario, tema y zoom */
(function () {
  'use strict';

  /* ---------- Datos de los módulos ---------- */
  var STEPS = [
    { short: 'Intro: MEM',   title: 'Mercado Eléctrico Mayorista', stage: 'Coordinación', s: 'mem', icon: 'i-hub',         desc: 'Quién coordina y despacha la energía del país: el M.E.M. y CAMMESA.', groups: ['actores'], nav: 0 },
    { short: 'Generación',    title: 'Proceso de generación',        stage: 'Inicio',       s: 'gen', icon: 'i-plant',       desc: 'Centrales térmicas, hidroeléctricas, nucleares y renovables. Salida en media tensión.', groups: ['fisico'], nav: 1 },
    { short: 'Cables',        title: 'Conductores de la red',        stage: 'Arcos',        s: 'cab', icon: 'i-cable',       desc: 'Aluminio, acero y cobre. Por qué el cable ACSR domina la alta tensión.', groups: ['fisico', 'infra'], nav: 1 },
    { short: 'Torres',        title: 'Torres eléctricas',            stage: 'Arcos',        s: 'tor', icon: 'i-pylon',       desc: 'Partes de una torre, aisladores, tipos de estructura y configuraciones de fase.', groups: ['fisico', 'infra'], nav: 1 },
    { short: 'Transporte',    title: 'Transporte · SADI',            stage: 'Arcos',        s: 'tra', icon: 'i-grid',        desc: 'Transener (500 kV), la red troncal (132 kV) e interconexiones internacionales.', groups: ['fisico', 'actores'], nav: 1 },
    { short: 'Subestaciones', title: 'Subestaciones de transformación', stage: 'Nodos',     s: 'sub', icon: 'i-transformer', desc: 'Cómo se reduce la tensión por etapas: de 500 kV a 220 V.', groups: ['fisico', 'infra'], nav: 1 },
    { short: 'Distribución',  title: 'Distribuidores y consumidores', stage: 'Final',       s: 'dis', icon: 'i-house',       desc: 'Edenor, Edesur, cooperativas, grandes usuarios y usuarios residenciales.', groups: ['fisico', 'actores'], nav: 1 },
    { short: 'Regulación',    title: 'Marco regulatorio',            stage: 'Regulación',   s: 'reg', icon: 'i-scale',       desc: 'Secretaría de Energía y ENRE: quién define la política y quién controla.', groups: ['actores'], nav: 2 }
  ];
  var TOTAL = STEPS.length;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Almacenamiento seguro ---------- */
  function load(key, fallback) { try { var v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch (e) { return fallback; } }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }
  var visited = load('sea-visited', []);
  if (!Array.isArray(visited)) visited = [];

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function stageVars(s) { return '--s:var(--s-' + s + ');--sc:var(--s-' + s + '-c)'; }
  function icon(id, cls) { return '<svg class="ico ' + (cls || '') + '" aria-hidden="true"><use href="#' + id + '"/></svg>'; }

  /* Minutos de lectura estimados (≈180 palabras/min) */
  STEPS.forEach(function (st, i) {
    var p = document.getElementById('panel-' + i);
    var words = p ? (p.textContent || '').trim().split(/\s+/).length : 0;
    st.min = Math.max(2, Math.round(words / 180));
    st.text = (st.title + ' ' + st.short + ' ' + st.desc + ' ' + (p ? p.textContent : '')).toLowerCase();
  });

  /* ---------- Drawer: ítems ---------- */
  STEPS.forEach(function (st, i) {
    var a = document.createElement('a');
    a.className = 'nav-link state';
    a.href = '#/paso/' + i;
    a.setAttribute('role', 'listitem');
    a.dataset.nav = String(i);
    a.innerHTML =
      '<span class="nav-ico" style="' + stageVars(st.s) + '">' + icon(st.icon) + '</span>' +
      '<span class="nav-txt"><small>' + (i === 0 ? 'Intro' : i === 7 ? 'MEM 02' : 'Paso ' + i) + '</small>' + st.short + '</span>' +
      '<span class="msr fill nav-done" aria-hidden="true">check_circle</span>' +
      '<span class="sr-only nav-sr"></span>';
    $('#nav-steps-' + st.nav).appendChild(a);
  });

  /* ---------- Trail (mini‑recorrido en cada módulo) ---------- */
  var trail = $('#trail-list');
  STEPS.forEach(function (st, i) {
    var li = document.createElement('li');
    li.innerHTML = '<a href="#/paso/' + i + '" style="' + stageVars(st.s) + '" data-tooltip="' + (i === 0 ? 'Intro' : i === 7 ? 'Regulación' : 'Paso ' + i) + ': ' + st.short + '">' +
      icon(st.icon) + '<span class="sr-only">' + (i === 0 ? 'Intro' : i === 7 ? 'Regulación' : 'Paso ' + i) + ': ' + st.short + '</span></a>';
    trail.appendChild(li);
  });

  /* ---------- Tarjetas de módulos ---------- */
  var cardsEl = $('#cards');
  function renderCards(filter, q) {
    q = (q || '').trim().toLowerCase();
    var html = '', n = 0;
    STEPS.forEach(function (st, i) {
      if (filter !== 'all' && st.groups.indexOf(filter) === -1) return;
      if (q && st.text.indexOf(q) === -1) return;
      var label = i === 0 ? 'Intro' : i === 7 ? 'MEM 02' : 'Paso ' + i;
      html += '<a class="mcard' + (visited.indexOf(i) > -1 ? ' is-visited' : '') + '" href="#/paso/' + i + '" style="' + stageVars(st.s) + ';--i:' + n + '">' +
        '<div class="mcard-top"><span class="mcard-ico" aria-hidden="true">' + icon(st.icon) + '</span>' +
        '<div><h3>' + st.title + '</h3><p>' + st.desc + '</p></div></div>' +
        '<div class="mcard-foot"><span class="pill stage-pill">' + label + ' · ' + st.stage + '</span>' +
        '<span class="pill"><span class="msr" aria-hidden="true">schedule</span>' + st.min + ' min</span>' +
        '<span class="visited"><span class="msr fill" aria-hidden="true">check_circle</span>Visto</span></div></a>';
      n++;
    });
    cardsEl.innerHTML = n ? html : '<p class="empty">No hay módulos que coincidan con la búsqueda.</p>';
  }
  var currentFilter = 'all';
  $all('.chip').forEach(function (c) {
    c.addEventListener('click', function () {
      currentFilter = c.dataset.filter;
      $all('.chip').forEach(function (o) { o.setAttribute('aria-pressed', String(o === c)); });
      renderCards(currentFilter, $('#search').value);
    });
  });
  $('#search').addEventListener('input', function (e) { renderCards(currentFilter, e.target.value); });

  /* ---------- Progreso ---------- */
  function nextStep() {
    for (var i = 0; i < TOTAL; i++) if (visited.indexOf(i) === -1) return i;
    return -1;
  }
  function updateProgress() {
    var done = visited.length, pct = Math.round(done / TOTAL * 100), nx = nextStep();
    $all('[data-progress-text]').forEach(function (el) { el.textContent = done + ' de ' + TOTAL + ' módulos recorridos'; });
    $all('[data-progress-bar], [data-hero-bar]').forEach(function (el) { el.style.setProperty('--p', pct + '%'); el.setAttribute('aria-valuenow', done); el.setAttribute('aria-valuetext', pct + '% completo'); });
    $('[data-hero-pct]').textContent = pct + '% completo';
    var cont = $('[data-continue]'), lbl = $('[data-continue-label]'), step = $('[data-hero-step]'), badge = $('[data-hero-badge]');
    if (nx === -1) {
      badge.textContent = 'Recorrido completo';
      step.innerHTML = '¡Completaste los 8 módulos! <span>· Repasá cuando quieras</span>';
      cont.href = '#/paso/0'; lbl.textContent = 'Repasar desde el inicio';
    } else {
      badge.textContent = done ? 'Recorrido en curso' : 'Nuevo recorrido';
      step.innerHTML = 'Módulo ' + (nx + 1) + ' de ' + TOTAL + ' <span>· ' + STEPS[nx].short + '</span>';
      cont.href = '#/paso/' + nx; lbl.textContent = done ? 'Continuar: ' + STEPS[nx].short : 'Empezar el recorrido';
    }
    // Mapa: visitados y "seguí acá"
    $all('[data-step-link]').forEach(function (el) {
      var i = +el.dataset.stepLink, v = visited.indexOf(i) > -1;
      el.classList.toggle('is-visited', v);
      el.classList.toggle('is-next', i === nx);
      el.setAttribute('aria-label', (el.querySelector('.node-title, .b-txt strong') || el).textContent.trim() +
        ', ' + (i === 0 ? 'Introducción' : i === 7 ? 'Marco regulatorio' : 'Paso ' + i) + (v ? ' (visitado)' : '') + (i === nx ? ' (siguiente sugerido)' : ''));
    });
    $all('[data-band-state]').forEach(function (el) {
      var i = +el.dataset.bandState;
      el.innerHTML = visited.indexOf(i) > -1 ? '<span class="msr fill" aria-hidden="true" style="font-size:18px;color:var(--md-success)">check_circle</span>Visto' : (i === nx ? 'Seguí acá' : '');
    });
    $all('.nav-link[data-nav]').forEach(function (a) {
      if (a.dataset.nav === 'map') return;
      var v = visited.indexOf(+a.dataset.nav) > -1;
      a.classList.toggle('is-visited', v);
      var sr = a.querySelector('.nav-sr'); if (sr) sr.textContent = v ? ' (visitado)' : '';
    });
    $all('#trail-list a').forEach(function (a, i) { a.classList.toggle('is-visited', visited.indexOf(i) > -1); });
  }
  $('[data-reset]').addEventListener('click', function () {
    visited = []; save('sea-visited', visited); updateProgress(); renderCards(currentFilter, $('#search').value);
    announce('Progreso reiniciado');
  });

  /* Región viva para lectores de pantalla */
  var live = document.createElement('div');
  live.className = 'sr-only'; live.setAttribute('aria-live', 'polite'); document.body.appendChild(live);
  function announce(t) { live.textContent = ''; setTimeout(function () { live.textContent = t; }, 30); }

  /* ---------- Router (hash) ---------- */
  var viewMap = $('#view-map'), viewMod = $('#view-module');
  var firstRun = true;

  function setCurrentNav(key) {
    $all('.nav-link').forEach(function (a) {
      if (a.dataset.nav === key) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  function renderModNav(i) {
    var prev = i > 0 ? STEPS[i - 1] : null, next = i < TOTAL - 1 ? STEPS[i + 1] : null, html = '';
    html += prev
      ? '<a class="prev state" href="#/paso/' + (i - 1) + '"><span class="msr" aria-hidden="true">arrow_back</span><span><small>Anterior</small><span class="t">' + prev.short + '</span></span></a>'
      : '<a class="prev state" href="#/mapa"><span class="msr" aria-hidden="true">map</span><span><small>Volver</small><span class="t">Mapa de la energía</span></span></a>';
    html += next
      ? '<a class="next state" href="#/paso/' + (i + 1) + '"><span><small>Siguiente</small><span class="t">' + next.short + '</span></span><span class="msr" aria-hidden="true">arrow_forward</span></a>'
      : '<a class="next finish state" href="#/mapa"><span><small>Fin del recorrido</small><span class="t">Volver al mapa</span></span><span class="msr fill" aria-hidden="true">check_circle</span></a>';
    $('#mod-nav').innerHTML = html;
  }

  function enter(el) {
    if (reduceMotion) return;
    el.classList.remove('view-enter'); void el.offsetWidth; el.classList.add('view-enter');
  }

  function showMap() {
    viewMod.hidden = true; viewMap.hidden = false; enter(viewMap);
    setCurrentNav('map');
    document.title = 'Mapa de la energía · Sistema Eléctrico Argentino';
    renderCards(currentFilter, $('#search').value);
    updateProgress();
  }

  function showModule(i) {
    var st = STEPS[i];
    viewMap.hidden = true; viewMod.hidden = false;
    $all('.step-panel').forEach(function (p) { p.hidden = +p.dataset.step !== i; });
    var panel = document.getElementById('panel-' + i);
    var head = panel.querySelector('.mod-head');
    head.setAttribute('style', stageVars(st.s));
    enter(panel);

    if (visited.indexOf(i) === -1) { visited.push(i); visited.sort(); save('sea-visited', visited); }

    // Trail
    trail.style.setProperty('--fill', String(i / (TOTAL - 1)));
    $all('#trail-list a').forEach(function (a, k) {
      if (k === i) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current');
    });
    $('[data-trail-current]').innerHTML = '<b>' + (i === 0 ? 'Intro' : i === 7 ? 'Regulación' : 'Paso ' + i) + ' · ' + st.short + '</b> · ' + st.stage;
    $('[data-trail-total]').textContent = 'Módulo ' + (i + 1) + ' de ' + TOTAL + ' · ' + st.min + ' min de lectura';

    renderModNav(i);
    setCurrentNav(String(i));
    updateProgress();
    document.title = st.title + ' · Sistema Eléctrico Argentino';
  }

  function route() {
    var m = location.hash.match(/^#\/paso\/(\d+)$/);
    var isMod = m && +m[1] >= 0 && +m[1] < TOTAL;
    if (isMod) showModule(+m[1]);
    else if (/^#\/?(mapa)?$/.test(location.hash) || location.hash === '') showMap();
    else return; // anclas internas (ej. #mapa-energia)

    closeDrawer(true);
    if (!firstRun) {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      var focusEl = isMod ? document.getElementById('t-' + m[1]) : $('#main');
      if (focusEl) focusEl.focus({ preventScroll: true });
    }
    firstRun = false;
  }
  window.addEventListener('hashchange', route);

  /* View Transitions API (si existe) para cambios de vista suaves */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#/"]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || !document.startViewTransition || reduceMotion) return;
    if (a.getAttribute('href') === location.hash) return;
    e.preventDefault();
    var href = a.getAttribute('href');
    document.startViewTransition(function () { history.pushState(null, '', href); route(); });
  });
  window.addEventListener('popstate', function () { /* hashchange cubre el resto */ });

  /* ---------- Drawer modal (pantallas chicas) ---------- */
  var drawer = $('#drawer'), menuBtn = $('#menu-btn'), scrim = $('#scrim');
  var mqDrawer = window.matchMedia('(max-width: 1100px)');
  var mqSheetDock = window.matchMedia('(min-width: 1480px)');
  function openDrawer() {
    document.body.classList.add('drawer-open'); menuBtn.setAttribute('aria-expanded', 'true');
    scrim.classList.add('on'); scrim.classList.remove('for-sheet');
    var first = drawer.querySelector('a'); if (first) first.focus();
  }
  function closeDrawer(silent) {
    if (!document.body.classList.contains('drawer-open')) return;
    document.body.classList.remove('drawer-open'); menuBtn.setAttribute('aria-expanded', 'false');
    if (!document.body.classList.contains('sheet-open')) scrim.classList.remove('on');
    if (!silent) menuBtn.focus();
  }
  menuBtn.addEventListener('click', function () { document.body.classList.contains('drawer-open') ? closeDrawer() : openDrawer(); });

  /* ---------- Side sheet ---------- */
  var sheet = $('#sheet'), sheetBtn = $('#sheet-btn');
  function openSheet() {
    document.body.classList.add('sheet-open'); sheetBtn.setAttribute('aria-expanded', 'true');
    if (!mqSheetDock.matches) { scrim.classList.add('on', 'for-sheet'); sheet.focus(); }
    save('sea-sheet', true);
  }
  function closeSheet(restore) {
    document.body.classList.remove('sheet-open'); sheetBtn.setAttribute('aria-expanded', 'false');
    if (!document.body.classList.contains('drawer-open')) scrim.classList.remove('on', 'for-sheet');
    save('sea-sheet', false);
    if (restore) sheetBtn.focus();
  }
  sheetBtn.addEventListener('click', function () { document.body.classList.contains('sheet-open') ? closeSheet() : openSheet(); });
  $('[data-close-sheet]').addEventListener('click', function () { closeSheet(true); });
  scrim.addEventListener('click', function () { closeDrawer(); if (!mqSheetDock.matches) closeSheet(); });
  if (mqSheetDock.matches && load('sea-sheet', false)) openSheet();

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (document.body.classList.contains('drawer-open')) closeDrawer();
    else if (document.body.classList.contains('sheet-open') && !mqSheetDock.matches) closeSheet(true);
  });

  /* ---------- Tema claro / oscuro ---------- */
  var themeBtn = $('#theme-btn');
  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    return t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function syncThemeBtn() {
    var d = isDark();
    themeBtn.querySelector('.msr').textContent = d ? 'light_mode' : 'dark_mode';
    themeBtn.setAttribute('aria-label', d ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
  themeBtn.addEventListener('click', function () {
    var t = isDark() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('sea-theme', t); } catch (e) {}
    syncThemeBtn();
  });
  syncThemeBtn();

  /* ---------- Top bar con borde al hacer scroll ---------- */
  var topbar = $('#topbar');
  window.addEventListener('scroll', function () { topbar.classList.toggle('is-scrolled', window.scrollY > 4); }, { passive: true });

  /* ---------- Saludo según hora ---------- */
  var h = new Date().getHours();
  $('#greet').textContent = (h < 12 ? '¡Buen día!' : h < 20 ? '¡Buenas tardes!' : '¡Buenas noches!') + ' Bienvenidos al recorrido';

  /* ---------- Profundizá ---------- */
  $all('.dd-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
      btn.closest('.deepdive').classList.toggle('open', open);
    });
  });

  /* ---------- Zoom de imágenes ---------- */
  var zoom = $('#zoom'), zImg = $('#zoom-img'), zCap = $('#zoom-cap'), zoomOpener = null;
  $all('[data-zoom]').forEach(function (b) {
    b.addEventListener('click', function () {
      var img = b.querySelector('img'), fig = b.closest('figure');
      var cap = fig ? fig.querySelector('figcaption') : null;
      zImg.src = img.currentSrc || img.src; zImg.alt = img.alt;
      zCap.textContent = cap ? cap.textContent : '';
      zoomOpener = b;
      if (zoom.showModal) zoom.showModal(); else zoom.setAttribute('open', '');
    });
  });
  function closeZoom() { if (zoom.close) zoom.close(); else zoom.removeAttribute('open'); }
  $('[data-close-zoom]').addEventListener('click', closeZoom);
  zoom.addEventListener('click', function (e) { if (e.target === zoom || e.target === zImg) closeZoom(); });
  zoom.addEventListener('close', function () { if (zoomOpener) zoomOpener.focus(); });

  /* ---------- Tooltips (botones solo ícono) ----------
     Texto: data-tooltip o, si no hay, el aria-label (así el del tema se actualiza solo).
     Mouse: aparece tras 400ms. Teclado: inmediato. Táctil: no se muestra.
     Es aria-hidden porque el control ya expone el mismo texto como nombre accesible. */
  var TT_SEL = '.icon-btn, .zoom-close, .trail li a, [data-tooltip]';
  var tip = document.createElement('div');
  tip.className = 'tooltip'; tip.setAttribute('aria-hidden', 'true');
  document.body.appendChild(tip);
  var tipTimer = null, tipFor = null;

  function tipText(el) { return (el.getAttribute('data-tooltip') || el.getAttribute('aria-label') || '').trim(); }
  function placeTip(el) {
    var r = el.getBoundingClientRect(), gap = 8, vw = document.documentElement.clientWidth;
    var tw = tip.offsetWidth, th = tip.offsetHeight;
    var below = r.bottom + gap + th <= window.innerHeight; // abajo por defecto, arriba si no entra
    var top = below ? r.bottom + gap : r.top - gap - th;
    var left = Math.min(Math.max(8, r.left + r.width / 2 - tw / 2), vw - tw - 8);
    tip.style.top = Math.round(top) + 'px';
    tip.style.left = Math.round(left) + 'px';
    tip.style.setProperty('--tt-origin', below ? 'top center' : 'bottom center');
  }
  function showTip(el, delay) {
    var text = tipText(el); if (!text) return;
    clearTimeout(tipTimer);
    tipTimer = setTimeout(function () {
      tipFor = el; tip.textContent = text; placeTip(el); tip.classList.add('on');
    }, delay);
  }
  function hideTip() { clearTimeout(tipTimer); tipFor = null; tip.classList.remove('on'); }

  document.addEventListener('pointerover', function (e) {
    if (e.pointerType === 'touch') return;
    var el = e.target.closest(TT_SEL); if (el && el !== tipFor) showTip(el, 400);
  });
  document.addEventListener('pointerout', function (e) {
    var el = e.target.closest(TT_SEL); if (el && !el.contains(e.relatedTarget)) hideTip();
  });
  document.addEventListener('focusin', function (e) {
    var el = e.target.closest(TT_SEL); if (el && el.matches(':focus-visible')) showTip(el, 0); else hideTip();
  });
  document.addEventListener('focusout', hideTip);
  document.addEventListener('pointerdown', hideTip);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideTip(); });
  window.addEventListener('scroll', hideTip, { passive: true });

  /* ---------- Inicio ---------- */
  renderCards('all', '');
  updateProgress();
  if (!location.hash) history.replaceState(null, '', '#/mapa');
  route();
})();
