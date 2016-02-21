(function (window) {
	'use strict';

	var gaoo = function (key, respectDNT) {
		var identifier = 'ga-disable-' + key;
		var storageKey = 'gaoo';

		// Prepare `respectDNT` option.
		respectDNT = respectDNT || true;

		var initialize = function () {

			// Persist initial state.
			if (!loaded()) {
				persist(respectDNT && dnt())
			}

			// Update recurring state.
			update(check());
		};

		var loaded = function () {
			return window.localStorage.getItem(storageKey) !== null;
		};

		var persist = function (value) {
			window.localStorage.setItem(storageKey, value);
		};

		var update = function (value) {
			window[identifier] = value;
		};

		var enable = function () {
			update(true);
			persist(true);
		};

		var disable = function () {
			update(false);
			persist(false);
		};

		var check = function () {
			return window.localStorage.getItem(storageKey);
		};

		var dnt = function () {
			return window.navigator.doNotTrack == '1' ||
			       window.navigator.doNotTrack == 'yes' ||
			       window.navigator.msDoNotTrack == '1' ||
			       window.doNotTrack == '1';
		};

		initialize();

		return {
			enable: enable,
			disable: disable,
			check: check,
			dnt: dnt,
			identifier: identifier
		};
	};

	window.gaoo = gaoo;
})(window);
