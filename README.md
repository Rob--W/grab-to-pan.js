# Grab-to-pan.js

A slim library with one purpose: An easy way to pan elements, i.e. change the scrolling
offset of a container by moving the mouse while the mouse button is pressed.
To see an example, check out [this demo](http://rob--w.github.io/grab-to-pan.js/demo.html):

```javascript
// Define the container that has to pan on grab
var g2p = new GrabToPan({
    element: scrollableContainer
});
// Activate the grab-to-pan behaviour
g2p.activate();
// Deactivate the grab-to-pan behaviour
g2p.deactivate();
```

By default, when a link or input element is clicked, panning
does not occur. You can change this behaviour by overriding the
ignoreTarget method. For instance:

```javascript
g2p.ignoreTarget = function(targetElement) {
    return false; // Always capture click, even if a link/input element is grabbed.
};
```

Two class names are introduced with this library, which can be used to give a
visual indication that an element can be grabbed & dragged. See grab-to-drag.css
for an example.

## Code conventions
This library follows the [code conventions of PDF.js](https://github.com/mozilla/pdf.js/wiki/Style-Guide),
because it was written for use in PDF.js.

The library declares only one object, `GrabToPan`. CommonJS/AMD modularity is
not included, but can easily be added if you wish:

```javascript
// CommonJS
// <grab-to-pan.js code here>
module.exports = GrabToPan;

// AMD
define(function() {
    // <grab-to-pan.js code here>
    return GrabToPan; 
});
```

## Supported browsers
The following browsers are supported:

* Chrome 7
* Firefox 4
* Internet Explorer 10
* Opera 11.60
* Safari 5.1

Support for Internet Explorer 9 can be added by including a polyfill for `classList`.
Support for Internet Explorer 8 can be added by including polyfills for `classList`,
the DOM2 Event API, and `matchesSelector`.

Support for earlier versions of Chrome, Firefox, Opera and Safari can be added
if you include a polyfill for `Function.prototype.bind` and `classList`.

### Compatibility notes

- In Safari for Windows and Chrome 21- for Windows, the cursor is not changed to
  "grab" / "grabbing".
- In Opera 12-, the "move" cursor is shown instead of a grab/grabbing cursor,
  because custom cursors are not supported in Presto.


## License

Copyright 2013 Rob Wu <gwnRob@gmail.com>

Licensed under the Apache 2.0 License.
