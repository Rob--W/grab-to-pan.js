# Grab-to-pan.js

A slim library with one purpose: An easy way to pan elements, i.e. change the scrolling
offset of a container by moving the mouse while the mouse button is pressed.
To see an example, check out [this demo](https://rob--w.github.io/grab-to-pan.js/demo.html):

```javascript
// Define the container that has to pan on grab
var g2p = new GrabToPan({
    element: scrollableContainer,         // required
    onActiveChanged: function(isActive) { // optional
        console.log('Grab-to-pan is ' + (isActive ? 'activated' : 'deactivated'));
    }
});
// Activate the grab-to-pan behaviour
g2p.activate();
// Deactivate the grab-to-pan behaviour
g2p.deactivate();
// Toggle the grab-to-pan behaviour: Activate if not activated, deactivate otherwise.
g2p.toggle();
// Is grab-to-pan active?
if (g2p.active) {
  console.log("Grab to pan is active!");
}
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


## Bookmarklet
Here is a bookmarklet that offers Grab to pan functionality for most *simple* pages.
Run it once to load and enable grab-to-pan, run it again to toggle grab-to-pan.

```javascript
javascript:(function(d,s) {
if(d.robsgrabtopanbookmark)return(d.robsgrabtopanbookmark).toggle(),s;
s=d.createElement('link');s.rel='stylesheet';
s.href='https://rob--w.github.io/grab-to-pan.js/grab-to-pan.css';
d.head.appendChild(s);
s=d.createElement('script');
s.src='https://rob--w.github.io/grab-to-pan.js/grab-to-pan.js';
s.onload=function(){
(d.robsgrabtopanbookmark=new(GrabToPan)({element:document.body})).activate();
s.remove();
};
d.body.appendChild(s);
})(document);
```

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

Copyright 2013 - 2015 Rob Wu <rob@robwu.nl>

Licensed under the Apache 2.0 License.
