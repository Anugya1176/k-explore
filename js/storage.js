/* LocalStorage-backed registration store (demo only: data never leaves this browser). */
(function () {
  var KEY = 'kexplore.registrations';

  function readAll() {
    try {
      var data = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(data) ? data : [];
    } catch (e) { return []; }
  }
  function writeAll(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); return true; }
    catch (e) { return false; }
  }

  KX.store = {
    all: readAll,
    /* Duplicate identifier = event id + lower-cased email address. */
    find: function (eventId, email) {
      email = String(email).trim().toLowerCase();
      return readAll().find(function (r) { return r.eventId === eventId && r.email === email; }) || null;
    },
    hasEvent: function (eventId) {
      return readAll().some(function (r) { return r.eventId === eventId; });
    },
    add: function (reg) {
      var list = readAll(); list.push(reg); return writeAll(list);
    },
    remove: function (id) {
      return writeAll(readAll().filter(function (r) { return r.id !== id; }));
    }
  };
})();
