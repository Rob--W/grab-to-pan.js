# Grab-to-pan.js

A slim library with one purpose: An easy way to pan elements.
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


In other words: This library allows one to change the scrolling offset of a
container by moving the mouse while the mouse button is pressed.

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
* Internet Explorer 9
* Opera 11.60
* Safari 5.1

Support for earlier versions of Chrome, Firefox, Opera and Safari can be added
if you include a polyfill for `Function.prototype.bind`.
To get support in Internet Explorer 8, you need to include a polyfill for
`Element.prototype.addEventListener` and `Element.prototype.matchesSelector`.
IE7- is explicitly not supported.

## License

Copyright 2013 Rob Wu <gwnRob@gmail.com>

Licensed under the Apache 2.0 License.
