/* Events page: search + category filter + reset + empty state (all combine). */
document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(location.search);
  var state = { q: params.get('q') || '', category: params.get('category') || 'All' };
  if (state.category !== 'All' && !KX.CATEGORIES.some(function (c) { return c.id === state.category; })) state.category = 'All';

  var input = document.getElementById('search'), chips = document.getElementById('chips'),
      grid = document.getElementById('events-grid'), empty = document.getElementById('empty-state'),
      status = document.getElementById('result-status'), resetBtns = document.querySelectorAll('[data-reset]');

  chips.innerHTML = ['All'].concat(KX.CATEGORIES.map(function (c) { return c.id; })).map(function (id) {
    return '<button type="button" class="chip" data-category="' + id + '" aria-pressed="false">' + id + '</button>';
  }).join('');

  function matches(ev) {
    var q = state.q.trim().toLowerCase();
    var inCategory = state.category === 'All' || ev.category === state.category;
    var haystack = [ev.title, ev.short, ev.description, ev.venue, ev.category, ev.organizer].join(' ').toLowerCase();
    return inCategory && (!q || q.split(/\s+/).every(function (word) { return haystack.indexOf(word) !== -1; }));
  }

  function render() {
    var list = KX.sorted(KX.EVENTS.filter(matches));
    chips.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.category === state.category); });
    input.value = state.q;
    KX.renderCards(grid, list);
    empty.hidden = list.length > 0;
    grid.hidden = list.length === 0;
    status.textContent = list.length ? 'Showing ' + list.length + (list.length === 1 ? ' event' : ' events') +
      (state.category !== 'All' ? ' in ' + state.category : '') + (state.q.trim() ? ' matching “' + state.q.trim() + '”' : '') : 'No events found';
    var next = new URLSearchParams();
    if (state.q.trim()) next.set('q', state.q.trim());
    if (state.category !== 'All') next.set('category', state.category);
    history.replaceState(null, '', location.pathname + (next.toString() ? '?' + next : ''));
  }

  input.addEventListener('input', function () { state.q = input.value; render(); });
  document.getElementById('search-form').addEventListener('submit', function (e) { e.preventDefault(); });
  chips.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (b) { state.category = b.dataset.category; render(); } });
  resetBtns.forEach(function (b) { b.addEventListener('click', function () { state = { q: '', category: 'All' }; render(); input.focus(); }); });
  render();
});
