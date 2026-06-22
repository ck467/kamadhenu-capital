/* ============================================================
   LOGO PREVIEW SWITCHER  (temporary picker — safe to remove)
   Swaps the live brand mark across header / hero / footer so you
   can judge each candidate in real context. Choice persists in
   localStorage. To remove: delete this file + its <script> tag
   in index.html. Nothing else references it.
   ============================================================ */
(function () {
  var KEY = 'kc-logo-pick';
  var OPTS = [
    { id: 'svg', src: 'assets/logo.svg',                 label: 'Original mark', lockup: false },
    { id: '1',   src: 'assets/logo-candidates/logo-1.jpeg', label: 'Logo 1',     lockup: true  },
    { id: '2',   src: 'assets/logo-candidates/logo-2.jpeg', label: 'Logo 2',     lockup: true  },
    { id: '3',   src: 'assets/logo-candidates/logo-3.jpeg', label: 'Logo 3',     lockup: true  },
    { id: '4',   src: 'assets/logo-candidates/logo-4.jpeg', label: 'Logo 4',     lockup: true  }
  ];

  // ---- styles (scoped, injected so removal is one-line) ----
  var css =
    '.emblem.is-lockup{border-radius:8px;}' +
    'body.logo-lockup .emblem-nav{width:auto;height:40px;}' +
    'body.logo-lockup .emblem-creed{width:auto;height:120px;}' +
    'body.logo-lockup .logo .wm{display:none;}' +           /* lockup already says the name */
    '#lp{position:fixed;right:16px;bottom:16px;z-index:9999;font-family:Inter,system-ui,sans-serif;}' +
    '#lp .panel{background:#fffdf8;border:1px solid #e8dcc6;border-radius:14px;' +
      'box-shadow:0 16px 40px -20px rgba(31,27,20,.5);padding:14px;width:212px;' +
      'transform:translateY(8px);opacity:0;pointer-events:none;transition:.2s;}' +
    '#lp.open .panel{transform:none;opacity:1;pointer-events:auto;}' +
    '#lp .ttl{font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;' +
      'color:#a06e12;margin:0 0 10px;}' +
    '#lp .row{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;}' +
    '#lp .sw{aspect-ratio:1;border-radius:8px;border:2px solid #e8dcc6;background:#fffdf8;' +
      'overflow:hidden;cursor:pointer;padding:0;}' +
    '#lp .sw img{width:100%;height:100%;object-fit:contain;}' +
    '#lp .sw.on{border-color:#c2871d;box-shadow:0 4px 12px -5px rgba(194,135,29,.8);}' +
    '#lp .now{margin:10px 0 0;font-size:12px;color:#6b6354;}' +
    '#lp .now b{color:#1f1b14;font-weight:600;}' +
    '#lp .tab{margin-top:8px;margin-left:auto;display:flex;align-items:center;gap:7px;' +
      'background:#1f1b14;color:#fbf7ef;border:none;border-radius:999px;padding:9px 14px;' +
      'font-size:12.5px;font-weight:600;cursor:pointer;box-shadow:0 8px 20px -8px rgba(31,27,20,.6);}' +
    '#lp .tab .dot{width:9px;height:9px;border-radius:50%;background:#c2871d;}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function applyMark(opt) {
    var imgs = document.querySelectorAll('.emblem');
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].src = opt.src;
      imgs[i].classList.toggle('is-lockup', !!opt.lockup);
    }
    document.body.classList.toggle('logo-lockup', !!opt.lockup);
  }

  function find(id) {
    for (var i = 0; i < OPTS.length; i++) if (OPTS[i].id === id) return OPTS[i];
    return OPTS[0];
  }

  // ---- build floating control ----
  var root = document.createElement('div');
  root.id = 'lp';
  var sws = '';
  for (var i = 0; i < OPTS.length; i++) {
    sws += '<button class="sw" data-id="' + OPTS[i].id + '" title="' + OPTS[i].label +
           '"><img src="' + OPTS[i].src + '" alt="' + OPTS[i].label + '" /></button>';
  }
  root.innerHTML =
    '<div class="panel">' +
      '<p class="ttl">Try a logo</p>' +
      '<div class="row">' + sws + '</div>' +
      '<p class="now">Showing: <b id="lp-now"></b></p>' +
    '</div>' +
    '<button class="tab"><span class="dot"></span>Logo preview</button>';
  document.body.appendChild(root);

  var nowEl = root.querySelector('#lp-now');
  var swEls = root.querySelectorAll('.sw');

  function select(id, persist) {
    var opt = find(id);
    applyMark(opt);
    nowEl.textContent = opt.label;
    for (var i = 0; i < swEls.length; i++)
      swEls[i].classList.toggle('on', swEls[i].getAttribute('data-id') === id);
    if (persist) { try { localStorage.setItem(KEY, id); } catch (e) {} }
  }

  for (var j = 0; j < swEls.length; j++) {
    swEls[j].addEventListener('click', function () {
      select(this.getAttribute('data-id'), true);
    });
  }
  root.querySelector('.tab').addEventListener('click', function () {
    root.classList.toggle('open');
  });

  var saved;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  select(saved || 'svg', false);
})();
