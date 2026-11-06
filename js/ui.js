/* Shared UI: helpers, header/footer, theme toggle, toast, countdown, scroll reveal, event card. */
(function () {
  var TZ = 'Asia/Kolkata';
  function fmt(opts) { var f = new Intl.DateTimeFormat('en-IN', Object.assign({ timeZone: TZ }, opts)); return function (iso) { return f.format(new Date(iso)); }; }

  KX.fmt = {
    date: fmt({ day: 'numeric', month: 'short', year: 'numeric' }),
    long: fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    time: fmt({ hour: 'numeric', minute: '2-digit', hour12: true }),
    stamp: fmt({ day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })
  };
  KX.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  };
  KX.getEvent = function (id) { return KX.EVENTS.find(function (e) { return e.id === id; }) || null; };
  KX.isPast = function (ev) { return new Date(ev.date) <= new Date(); };
  KX.eventUrl = function (id) { return 'event.html?id=' + encodeURIComponent(id); };
  KX.registerUrl = function (id) { return 'register.html?event=' + encodeURIComponent(id); };
  KX.feeLabel = function (ev) { return ev.fee ? '₹' + ev.fee : 'Free'; };
  KX.sorted = function (list) { return list.slice().sort(function (a, b) { return new Date(a.date) - new Date(b.date); }); };

  /* ---------- Event card ---------- */
  KX.cardHtml = function (ev) {
    var past = KX.isPast(ev), url = KX.eventUrl(ev.id);
    return '<article class="card reveal">' +
      '<a class="card-media" href="' + url + '" tabindex="-1"><img src="' + ev.image + '" alt="' + KX.esc(ev.title) + ' artwork" loading="lazy" width="600" height="400">' +
      '<span class="badge">' + KX.esc(ev.category) + '</span></a>' +
      '<div class="card-body">' +
      '<p class="card-meta"><span aria-hidden="true">📅</span> ' + KX.fmt.date(ev.date) + ' · ' + KX.fmt.time(ev.date) + '</p>' +
      '<h3 class="card-title"><a href="' + url + '">' + KX.esc(ev.title) + '</a></h3>' +
      '<p class="card-meta"><span aria-hidden="true">📍</span> ' + KX.esc(ev.venue) + '</p>' +
      '<p class="card-text">' + KX.esc(ev.short) + '</p>' +
      '<div class="card-foot"><span class="card-count" data-countdown="' + ev.date + '" data-mode="short">' + (past ? 'Event ended' : '') + '</span>' +
      '<a class="btn btn-primary btn-sm" href="' + url + '">View Details<span class="sr-only"> for ' + KX.esc(ev.title) + '</span></a></div>' +
      '</div></article>';
  };
  KX.renderCards = function (container, list) {
    container.innerHTML = list.map(KX.cardHtml).join('');
    KX.tick(); KX.reveal();
  };

  /* ---------- Toast ---------- */
  KX.toast = function (message, type) {
    var region = document.getElementById('toast-region');
    if (!region) { region = document.createElement('div'); region.id = 'toast-region'; region.className = 'toast-region'; region.setAttribute('role', 'status'); region.setAttribute('aria-live', 'polite'); document.body.appendChild(region); }
    var t = document.createElement('div');
    t.className = 'toast toast-' + (type || 'success');
    t.textContent = message;
    region.appendChild(t);
    setTimeout(function () { t.classList.add('leaving'); setTimeout(function () { t.remove(); }, 300); }, 4500);
  };

  /* ---------- Countdown ---------- */
  KX.tick = function () {
    document.querySelectorAll('[data-countdown]').forEach(function (el) {
      var ms = new Date(el.dataset.countdown) - Date.now();
      var s = Math.max(0, Math.floor(ms / 1000));
      var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
      if (el.dataset.mode === 'short') {
        el.textContent = ms <= 0 ? 'Event ended' : 'Starts in ' + (d > 0 ? d + 'd ' + h + 'h' : h + 'h ' + m + 'm');
        return;
      }
      if (ms <= 0) { el.innerHTML = '<p class="countdown-done">This event has started. Registration is closed.</p>'; return; }
      if (!el.firstElementChild || el.firstElementChild.className === 'countdown-done') {
        el.innerHTML = ['Days', 'Hours', 'Minutes', 'Seconds'].map(function (l) {
          return '<div class="cd-unit"><span class="cd-num">00</span><span class="cd-label">' + l + '</span></div>';
        }).join('');
      }
      var nums = el.querySelectorAll('.cd-num');
      [d, h, m, sec].forEach(function (v, i) { nums[i].textContent = String(v).padStart(2, '0'); });
    });
  };

  /* ---------- Scroll reveal ---------- */
  var observer = null;
  KX.reveal = function () {
    var items = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { items.forEach(function (i) { i.classList.add('in'); }); return; }
    observer = observer || new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (i) { observer.observe(i); });
  };

  /* ---------- Header / footer ---------- */
  var SUN = '<svg class="icon-sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg class="icon-moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  function renderHeader() {
    var page = document.body.dataset.page, host = document.getElementById('site-header');
    if (!host) return;
    function link(href, label, key, extra) { return '<a href="' + href + '"' + (page === key ? ' aria-current="page"' : '') + '>' + label + (extra || '') + '</a>'; }
    var count = KX.store.all().length;
    host.className = 'site-header';
    host.innerHTML = '<a class="skip-link" href="#main">Skip to content</a><div class="container nav">' +
      '<a class="brand" href="index.html" aria-label="K Explore home"><span class="brand-mark" aria-hidden="true">K</span><span>Explore</span></a>' +
      '<nav id="primary-nav" class="nav-links" aria-label="Primary">' +
      link('index.html', 'Home', 'home') + link('events.html', 'Events', 'events') + link('index.html#about', 'About', 'about') +
      link('my-registrations.html', 'My Registrations', 'mine', '<span class="count-pill" id="reg-count"' + (count ? '' : ' hidden') + '>' + count + '</span>') +
      '<a class="btn btn-primary btn-sm nav-cta" href="register.html">Register</a></nav>' +
      '<div class="nav-actions"><button class="icon-btn theme-toggle" type="button" id="theme-toggle">' + SUN + MOON + '</button>' +
      '<button class="icon-btn nav-toggle" type="button" id="nav-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span class="bars" aria-hidden="true"></span></button></div></div>';

    var nav = document.getElementById('primary-nav'), toggle = document.getElementById('nav-toggle');
    function setNav(open) { nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', open); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); }
    toggle.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });

    var themeBtn = document.getElementById('theme-toggle');
    function syncThemeBtn() {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      themeBtn.setAttribute('aria-pressed', dark);
    }
    themeBtn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('kexplore.theme', next); } catch (e) { /* ignore */ }
      syncThemeBtn();
    });
    syncThemeBtn();
  }

  KX.refreshRegCount = function () {
    var el = document.getElementById('reg-count'), n = KX.store.all().length;
    if (el) { el.textContent = n; el.hidden = !n; }
  };

  function renderFooter() {
    var host = document.getElementById('site-footer'); if (!host) return;
    host.className = 'site-footer';
    host.innerHTML = '<div class="container footer-grid">' +
      '<div><a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">K</span><span>Explore</span></a>' +
      '<p class="footer-note">Discover, follow and register for the best campus events, all in one place.</p></div>' +
      '<nav aria-label="Footer"><h2 class="footer-title">Explore</h2><ul><li><a href="index.html">Home</a></li><li><a href="events.html">All events</a></li><li><a href="register.html">Register</a></li><li><a href="my-registrations.html">My registrations</a></li></ul></nav>' +
      '<nav aria-label="Categories"><h2 class="footer-title">Categories</h2><ul>' +
      KX.CATEGORIES.slice(0, 5).map(function (c) { return '<li><a href="events.html?category=' + encodeURIComponent(c.id) + '">' + c.id + '</a></li>'; }).join('') + '</ul></nav>' +
      '<div><h2 class="footer-title">Contact</h2><address><p><a href="mailto:hello@kexplore.example">hello@kexplore.example</a></p><p><a href="tel:+910000000000">+91 00000 00000</a></p><p>K Explore Events Office,<br>University Campus, India</p></address></div>' +
      '</div><div class="container footer-bottom"><p>© ' + new Date().getFullYear() + ' K Explore. A college web-design project.</p>' +
      '<p>Demo site: registrations are saved only in your browser.</p></div>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderHeader(); renderFooter();
    KX.tick(); setInterval(KX.tick, 1000);
    KX.reveal();
  });
})();
