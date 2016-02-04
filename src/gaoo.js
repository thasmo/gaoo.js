(function (window) {
	'use strict';

	var gaoo = function (key) {
		var identifier = 'ga-disable-' + key;
		var storageKey = 'gaoo';

		var enable = function () {
			window[identifier] = true;
			window.localStorage.setItem(storageKey, true);
		};

		var disable = function () {
			window[identifier] = false;
			window.localStorage.removeItem(storageKey);
		};

		var check = function () {
			return window.localStorage.getItem(storageKey) !== null;
		};

		window[identifier] = window[identifier] || check();

		return {
			enable: enable,
			disable: disable,
			check: check,
			identifier: identifier
		};
	};

	window.gaoo = gaoo;
})(window);
