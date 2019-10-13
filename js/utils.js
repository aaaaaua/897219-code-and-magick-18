'use strict';

window.utils = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomArrValue: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomValue: function (min, max) {
      var rand = min + Math.random() * (max - min);
      return rand;
    }
  };
})();
