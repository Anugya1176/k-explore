/* Lists registrations saved in this browser's LocalStorage; allows cancelling. */
document.addEventListener('DOMContentLoaded', function () {
  var list = document.getElementById('reg-list'), empty = document.getElementById('reg-empty'), summary = document.getElementById('reg-summary');

  function render() {
    var regs = KX.store.all().slice().sort(function (a, b) { return new Date(b.registeredAt) - new Date(a.registeredAt); });
    empty.hidden = regs.length > 0; list.hidden = regs.length === 0;
    summary.textContent = regs.length ? regs.length + (regs.length === 1 ? ' registration' : ' registrations') + ' saved on this device' : '';
    list.innerHTML = regs.map(function (r) {
      var ev = KX.getEvent(r.eventId), when = ev ? KX.fmt.date(ev.date) + ' · ' + KX.fmt.time(ev.date) : 'Event details unavailable';
      return '<li class="reg-item reveal"><div class="reg-main">' +
        '<h2 class="reg-title">' + (ev ? '<a href="' + KX.eventUrl(ev.id) + '">' + KX.esc(r.eventTitle) + '</a>' : KX.esc(r.eventTitle)) + '</h2>' +
        '<p class="card-meta">📅 ' + when + (ev ? ' · 📍 ' + KX.esc(ev.venue) : '') + '</p>' +
        '<dl class="reg-details"><div><dt>Name</dt><dd>' + KX.esc(r.name) + '</dd></div><div><dt>Email</dt><dd>' + KX.esc(r.email) + '</dd></div>' +
        '<div><dt>Phone</dt><dd>' + KX.esc(r.phone) + '</dd></div><div><dt>Registered</dt><dd>' + KX.fmt.stamp(r.registeredAt) + '</dd></div></dl></div>' +
        '<div class="reg-side"><span class="reg-id">' + KX.esc(r.id) + '</span>' +
        (ev && !KX.isPast(ev) ? '<span class="card-count" data-countdown="' + ev.date + '" data-mode="short"></span>' : '') +
        '<button type="button" class="btn btn-danger btn-sm" data-cancel="' + KX.esc(r.id) + '">Cancel registration<span class="sr-only"> for ' + KX.esc(r.eventTitle) + '</span></button></div></li>';
    }).join('');
    KX.tick(); KX.reveal();
  }

  list.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cancel]'); if (!btn) return;
    if (!window.confirm('Cancel this registration? This cannot be undone.')) return;
    KX.store.remove(btn.dataset.cancel);
    KX.refreshRegCount(); render();
    KX.toast('Registration cancelled.', 'info');
  });
  render();
});
