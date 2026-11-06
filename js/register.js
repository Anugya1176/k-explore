/* Registration form: validation, duplicate check, LocalStorage save, confirmation. */
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('register-form'),
      fields = { name: form.elements.name, email: form.elements.email, phone: form.elements.phone, event: form.elements.event },
      preview = document.getElementById('event-preview'), formAlert = document.getElementById('form-alert');

  var NAME_RE = /^\p{L}[\p{L} .'-]{1,59}$/u;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  var PHONE_RE = /^[6-9]\d{9}$/;           // 10-digit Indian mobile number

  /* Strips spaces/dashes/brackets and an optional +91 / 91 / 0 prefix. */
  function normalizePhone(value) {
    var d = value.replace(/[\s\-().]/g, '');
    if (d.indexOf('+91') === 0) d = d.slice(3);
    else if (/^91\d{10}$/.test(d)) d = d.slice(2);
    else if (/^0\d{10}$/.test(d)) d = d.slice(1);
    return d;
  }

  var validators = {
    name: function (v) {
      v = v.trim();
      if (!v) return 'Please enter your full name.';
      if (!NAME_RE.test(v)) return 'Use 2–60 letters only (spaces, . \' - allowed).';
      return '';
    },
    email: function (v) {
      v = v.trim();
      if (!v) return 'Please enter your email address.';
      if (!EMAIL_RE.test(v)) return 'Enter a valid email, e.g. name@example.com.';
      return '';
    },
    phone: function (v) {
      if (!v.trim()) return 'Please enter your phone number.';
      if (!PHONE_RE.test(normalizePhone(v))) return 'Enter a valid 10-digit mobile number (optional +91).';
      return '';
    },
    event: function (v) {
      if (!v) return 'Please select an event.';
      var ev = KX.getEvent(v);
      if (!ev) return 'The selected event is not available.';
      if (KX.isPast(ev)) return 'Registration for this event has closed.';
      return '';
    }
  };

  function setError(name, message) {
    var field = fields[name], box = document.getElementById(name + '-error');
    box.textContent = message;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    field.closest('.field').classList.toggle('has-error', !!message);
    return message;
  }
  function validateField(name) { return setError(name, validators[name](fields[name].value)); }

  /* Populate the event dropdown (ended events are shown but disabled). */
  var selectedFromUrl = new URLSearchParams(location.search).get('event');
  fields.event.innerHTML = '<option value="">Select an event…</option>' + KX.sorted(KX.EVENTS).map(function (e) {
    var past = KX.isPast(e);
    return '<option value="' + e.id + '"' + (past ? ' disabled' : '') + '>' + KX.esc(e.title) + ' (' + KX.fmt.date(e.date) + (past ? ', ended' : '') + ')</option>';
  }).join('');
  if (selectedFromUrl && KX.getEvent(selectedFromUrl) && !KX.isPast(KX.getEvent(selectedFromUrl))) fields.event.value = selectedFromUrl;

  function renderPreview() {
    var ev = KX.getEvent(fields.event.value);
    preview.hidden = !ev;
    if (!ev) return;
    preview.innerHTML = '<img src="' + ev.image + '" alt="" width="120" height="80"><div><strong>' + KX.esc(ev.title) + '</strong>' +
      '<span>' + KX.fmt.long(ev.date) + ' · ' + KX.fmt.time(ev.date) + '</span><span>' + KX.esc(ev.venue) + ' · ' + KX.feeLabel(ev) + '</span></div>';
  }
  renderPreview();

  Object.keys(fields).forEach(function (name) {
    fields[name].addEventListener('blur', function () { if (fields[name].value || fields[name].dataset.touched) validateField(name); fields[name].dataset.touched = '1'; });
    fields[name].addEventListener('input', function () { if (fields[name].getAttribute('aria-invalid') === 'true') validateField(name); formAlert.hidden = true; });
  });
  fields.event.addEventListener('change', function () { renderPreview(); validateField('event'); });

  function newRegistrationId() { return 'KX-' + Date.now().toString(36).toUpperCase().slice(-5) + Math.random().toString(36).toUpperCase().slice(2, 5); }

  function showAlert(html) { formAlert.innerHTML = html; formAlert.hidden = false; formAlert.focus(); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    formAlert.hidden = true;
    var firstInvalid = null;
    Object.keys(fields).forEach(function (name) { if (validateField(name) && !firstInvalid) firstInvalid = fields[name]; });
    if (firstInvalid) { firstInvalid.focus(); return; }

    var ev = KX.getEvent(fields.event.value), email = fields.email.value.trim().toLowerCase();
    if (KX.store.find(ev.id, email)) {
      setError('email', 'This email is already registered for this event.');
      showAlert('<strong>Already registered.</strong> ' + KX.esc(email) + ' has already registered for ' + KX.esc(ev.title) + '. <a href="my-registrations.html">View my registrations</a>.');
      fields.email.focus();
      return;
    }
    var reg = {
      id: newRegistrationId(), eventId: ev.id, eventTitle: ev.title,
      name: fields.name.value.trim().replace(/\s+/g, ' '), email: email,
      phone: normalizePhone(fields.phone.value), registeredAt: new Date().toISOString()
    };
    if (!KX.store.add(reg)) {
      showAlert('<strong>Could not save your registration.</strong> Your browser is blocking LocalStorage (private mode or storage full). Please enable it and try again.');
      return;
    }
    KX.refreshRegCount();
    showSuccess(reg, ev);
  });

  function showSuccess(reg, ev) {
    var panel = document.getElementById('success-panel');
    panel.innerHTML = '<div class="success-icon" aria-hidden="true">✓</div><h2 id="success-title" tabindex="-1">You’re registered!</h2>' +
      '<p>Thanks, <strong>' + KX.esc(reg.name) + '</strong>. Your spot for <strong>' + KX.esc(ev.title) + '</strong> is confirmed.</p>' +
      '<dl class="info-list success-list"><div><dt>Registration ID</dt><dd>' + reg.id + '</dd></div><div><dt>When</dt><dd>' + KX.fmt.long(ev.date) + ', ' + KX.fmt.time(ev.date) + '</dd></div>' +
      '<div><dt>Where</dt><dd>' + KX.esc(ev.venue) + '</dd></div><div><dt>Email</dt><dd>' + KX.esc(reg.email) + '</dd></div></dl>' +
      '<p class="note">Demo notice: this confirmation is stored only in this browser. No email or SMS is sent.</p>' +
      '<div class="btn-row"><a class="btn btn-primary" href="my-registrations.html">View my registrations</a><a class="btn" href="events.html">Explore more events</a></div>';
    form.hidden = true; document.getElementById('demo-banner').hidden = true;
    panel.hidden = false;
    document.getElementById('success-title').focus();
    KX.toast('Registration successful! See you at ' + ev.title + '.');
  }
});
