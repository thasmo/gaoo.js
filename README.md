# gaoo.js

> Simple Google Analytics Opt-Out helper.

`gaoo.js` is a small helper script to [opt-out][ga-optout] from Google Analytics Tracking.

It uses local storage to remember an opt-out and will set a `window`
property which Google Analytics [inspects][ga-optout] to decide whether to track or not.

## Usage

```js
// Initialize on page load. This needs to be called before ga.js is executed.
window.gaoo('UA-123456-1');

// Actively opt-out from Google Analytics tracking.
window.gaoo('UA-123456-1').enable();

// Actively opt-in to Google Analytics tracking, again.
window.gaoo('UA-123456-1').disable();

// Check if currently opted out.
if(window.gaoo('UA-123456-1').check()) {
  window.console.log('Currently opted out.');
}

// Get opt-out identification string.
var identifier = window.gaoo('UA-123456-1').identifier;
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
