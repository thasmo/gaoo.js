# gaoo.js

> Simple Google Analytics Opt-Out helper.

`gaoo.js` is a small helper script to [opt-out][ga-optout] from Google Analytics Tracking.

It uses local storage to remember an opt-out and will set a `window` property which Google Analytics
[inspects][ga-optout] to decide whether to track or not. It supports `DNT` and respects it by default,
if not configured otherwise.

## Usage

```js
// Initialize on page load with respect to DNT.
window.gaoo('UA-123456-1');

// ... initialize on page load and do not respect DNT.
window.gaoo('UA-123456-1', false);

// Actively opt-out from Google Analytics tracking.
window.gaoo('UA-123456-1').enable();

// Actively opt-in to Google Analytics tracking, again.
window.gaoo('UA-123456-1').disable();

// Check if currently opted out.
if(window.gaoo('UA-123456-1').check()) {
  window.console.info('Currently opted out.');
} else {
  window.console.info('Tracking page-view now.');
}

// Get opt-out identification string.
var identifier = window.gaoo('UA-123456-1').identifier;

// Get DNT browser setting.
window.console.log(window.gaoo('UA-123456-1').dnt()); // true or false
```

### Examples

**jQuery Example**
```html
<button class="opt-out">Opt-Out now.</button>
<button class="opt-in">Opt-in again.</button>

<script>
  // Initialize gaoo.js and create a reference.
  var helper = window.gaoo('UA-123456-1');
  
  $('.opt-out').on('click', function(event) {
    helper.enable();
    event.preventDefault();
  });
  
  $('.opt-in').on('click', function(event) {
    helper.disable();
    event.preventDefault();
  });
</script>
```

## FAQ

**Which browsers does `gaoo.js` support?**  
Supported are all browsers which implement local storage.

**Can multiple Google Analytics properties be configured?**  
Currently it's not possible to define multiple properties to opt-out from.

**Can domains be configured to opt-out from?**  
Opting out works for the current `protocol://host:port` combination only.

[ga-optout]: https://developers.google.com/analytics/devguides/collection/analyticsjs/user-opt-out
