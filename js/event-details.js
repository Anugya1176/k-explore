/* Event details page, driven by ?id=<event id>. */
document.addEventListener('DOMContentLoaded', function () {
  var root = document.getElementById('event-root');
  var ev = KX.getEvent(new URLSearchParams(location.search).get('id'));

  if (!ev) {
    document.title = 'Event not found | K Explore';
    root.innerHTML = '<div class="container section empty"><h1>Event not found</h1><p>The event you are looking for does not exist or may have been removed.</p><a class="btn btn-primary" href="events.html">Browse all events</a></div>';
    return;
  }
  document.title = ev.title + ' | K Explore';
  var past = KX.isPast(ev), registered = KX.store.hasEvent(ev.id);
  var action = past ? '<button class="btn btn-block" type="button" disabled>Registration closed</button>'
    : '<a class="btn btn-primary btn-block" href="' + KX.registerUrl(ev.id) + '">' + (registered ? 'Register another person' : 'Register for this event') + '</a>' +
      (registered ? '<p class="note ok">✓ You have already registered on this device. <a href="my-registrations.html">View registrations</a></p>' : '');

  function row(label, value) { return '<div><dt>' + label + '</dt><dd>' + value + '</dd></div>'; }
  root.innerHTML =
    '<div class="detail-hero"><img src="' + ev.image + '" alt="' + KX.esc(ev.title) + ' artwork" width="1200" height="800"><div class="detail-hero-shade"></div>' +
    '<div class="container detail-hero-text"><a class="back-link" href="events.html">← All events</a><span class="badge badge-static">' + KX.esc(ev.category) + '</span><h1>' + KX.esc(ev.title) + '</h1>' +
    '<p>' + KX.fmt.long(ev.date) + ' · ' + KX.fmt.time(ev.date) + ' IST</p></div></div>' +
    '<div class="container detail-layout section">' +
    '<div class="detail-main"><div class="countdown" data-countdown="' + ev.date + '" role="timer" aria-label="Time until the event starts"></div>' +
    '<h2>About this event</h2><p class="lead-text">' + KX.esc(ev.description) + '</p>' +
    '<h2>Highlights</h2><ul class="check-list">' + ev.highlights.map(function (h) { return '<li>' + KX.esc(h) + '</li>'; }).join('') + '</ul>' +
    '<h2>Schedule</h2><ol class="timeline">' + ev.schedule.map(function (s) { return '<li><strong>' + KX.esc(s.time) + '</strong><span>' + KX.esc(s.item) + '</span></li>'; }).join('') + '</ol></div>' +
    '<aside class="detail-side" aria-label="Event information"><div class="side-card"><h2>Event details</h2><dl class="info-list">' +
    row('Date', KX.fmt.long(ev.date)) + row('Time', KX.fmt.time(ev.date) + ' IST') + row('Duration', KX.esc(ev.duration)) + row('Venue', KX.esc(ev.venue)) +
    row('Category', KX.esc(ev.category)) + row('Entry fee', KX.feeLabel(ev)) + row('Capacity', ev.capacity + ' attendees') + row('Organiser', KX.esc(ev.organizer)) +
    '</dl>' + action + '</div></aside></div>' +
    '<section class="section section-alt" aria-labelledby="related-title"><div class="container"><h2 id="related-title" class="section-title">More ' + KX.esc(ev.category) + ' events</h2><div class="grid" id="related-grid"></div></div></section>';

  var related = KX.sorted(KX.EVENTS.filter(function (e) { return e.id !== ev.id && !KX.isPast(e) && e.category === ev.category; }));
  if (related.length < 3) related = related.concat(KX.sorted(KX.EVENTS.filter(function (e) { return e.id !== ev.id && !KX.isPast(e) && e.category !== ev.category; }))).slice(0, 3);
  if (related.length) { KX.renderCards(document.getElementById('related-grid'), related.slice(0, 3)); }
  else document.querySelector('.section-alt').remove();
  KX.tick(); KX.reveal();
});
