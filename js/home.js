/* Homepage: featured, upcoming and category sections. */
document.addEventListener('DOMContentLoaded', function () {
  var upcoming = KX.sorted(KX.EVENTS.filter(function (e) { return !KX.isPast(e); }));
  var featured = KX.EVENTS.filter(function (e) { return e.featured && !KX.isPast(e); }).slice(0, 3);

  KX.renderCards(document.getElementById('featured-grid'), featured);
  KX.renderCards(document.getElementById('upcoming-grid'), upcoming.slice(0, 6));

  document.getElementById('category-grid').innerHTML = KX.CATEGORIES.map(function (c) {
    var n = KX.EVENTS.filter(function (e) { return e.category === c.id; }).length;
    return '<a class="cat-tile reveal" href="events.html?category=' + encodeURIComponent(c.id) + '"><span class="cat-icon" aria-hidden="true">' + c.icon + '</span>' +
      '<span class="cat-name">' + c.id + '</span><span class="cat-blurb">' + c.blurb + '</span><span class="cat-count">' + n + (n === 1 ? ' event' : ' events') + '</span></a>';
  }).join('');
  
  KX.reveal();
  
  document.getElementById('stat-events').textContent = KX.EVENTS.length;
  document.getElementById('stat-cats').textContent = KX.CATEGORIES.length;

  var stack = document.getElementById('hero-stack');
  stack.innerHTML = featured.slice(0, 3).map(function (e, i) {
    return '<a class="hero-card hero-card-' + (i + 1) + '" href="' + KX.eventUrl(e.id) + '"><img src="' + e.image + '" alt="' + KX.esc(e.title) + '" width="600" height="400"><span>' + KX.esc(e.title) + '</span></a>';
  }).join('');
});
