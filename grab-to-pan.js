/* Copyright 2013 Rob Wu <gwnRob@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var GrabToPan = (function GrabToPanClosure() {
  /**
   * Construct a GrabToPan instance for a given HTML element.
   * @param options {{element: Element}}
   **/
  function GrabToPan(options) {
    this.element = options.element;
    this.document = options.element.ownerDocument;
    if (typeof options.ignoreTarget === 'function') {
        this.ignoreTarget = options.ignoreTarget;
    }

    // Bind the contexts to ensure that `this` always points to
    // the GrabToPan instance.
    this._onmousedown = this._onmousedown.bind(this);
    this._onmousemove = this._onmousemove.bind(this);
    this._onmouseup = this._onmouseup.bind(this);
  }
  GrabToPan.prototype = {
    activate: function GrabToPan_activate() {
      // When addEventListener is repeatedly called with the same arguments,
      // the listener is added only once, so there's no need to manually
      // check whether or not activate() has been called before.
      this.element.addEventListener('mousedown', this._onmousedown, true);
    },
    deactivate: function GrabToPan_deactivate() {
      this.element.removeEventListener('mousedown', this._onmousedown, true);
      this.document.removeEventListener('mousemove', this._onmousemove, true);
      this.document.removeEventListener('mouseup', this._onmouseup, true);
    },
    /**
     * Whether to not pan if the target element is clicked.
     * Override this method to change the default behaviour.
     *
     * @param node {Element} The target of the event
     * @return {boolean} Whether to not react to the click event.
     **/
    ignoreTarget: function(node) {
        // Use matchesSelector to check whether the clicked element
        // is (a child of) an input element / link
        return node[matchesSelector](
            'a, * a, input, textarea, button, button *, select, option'
        );
    },
    /**
     * @private
     **/
    _onmousedown: function GrabToPan__onmousedown(event) {
      if (event.button !== 0 || this.ignoreTarget(event.target)) return;

      this.scrollLeftStart = this.element.scrollLeft;
      this.scrollTopStart = this.element.scrollTop;
      this.clientXStart = event.clientX;
      this.clientYStart = event.clientY;
      this.document.addEventListener('mousemove', this._onmousemove, true);
      this.document.addEventListener('mouseup', this._onmouseup, true);
      event.preventDefault();
      event.stopPropagation();
    },
    /**
     * @private
     **/
    _onmousemove: function GrabToPan__onmousemove(event) {
      if (isLeftMouseReleased(event)) {
        this.document.removeEventListener('mousemove', this._onmousemove, true);
        return;
      }
      var xDiff = event.clientX - this.clientXStart;
      var yDiff = event.clientY - this.clientYStart;
      this.element.scrollTop = this.scrollTopStart - yDiff;
      this.element.scrollLeft = this.scrollLeftStart - xDiff;
    },
    /**
     * @private
     **/
    _onmouseup: function GrabToPan__onmouseup(event) {
      this.document.removeEventListener('mousemove', this._onmousemove, true);
    }
  };

  // Get the correct (vendor-prefixed) name of the matches method.
  var matchesSelector;
  ['webkitM', 'mozM', 'msM', 'oM', 'm'].some(function(prefix) {
      var name = prefix + 'atches';
      if (name in document.documentElement) {
          matchesSelector = name;
      }
      name += 'Selector';
      if (name in document.documentElement) {
          matchesSelector = name;
      }
      return matchesSelector; // If found, then truthy, and [].some() ends.
  });

  // Browser sniffing because it's impossible to feature-detect
  // whether event.which for onmousemove is reliable
  var isNotIEorIsIE10plus = !document.documentMode || document.documentMode > 9;
  var chrome = window.chrome;
  var isChrome15OrOpera15plus = chrome&& (chrome.webstore || chrome.app);
  //                                      ^ Chrome 15+       ^ Opera 15+
  var isSafari6plus = /Apple/.test(navigator.vendor) &&
                      /Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);

  /**
   * Whether the left mouse is not pressed.
   * @param event {MouseEvent}
   * @return {boolean} True if the left mouse button is not pressed.
   *                   False if unsure or if the left mouse button is pressed.
   **/
  function isLeftMouseReleased(event) {
    if ('buttons' in event && isNotIEorIsIE10plus) {
      // http://www.w3.org/TR/DOM-Level-3-Events/#events-MouseEvent-buttons
      // Firefox 15+
      // Internet Explorer 10+
      return !(event.buttons | 1);
    }
    if (isChrome15OrOpera15plus || isSafari6plus) {
      // Chrome 14+
      // Opera 15+
      // Safari 6.0+
      return event.which === 0;
    }
  }

  return GrabToPan;
})();
