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
    },
    getRandomArrNValues: function (array, n) { // возвращает указанное колличество случайных элементов из массива
      var arrayCopy = array.slice();
      var shuffled = arrayCopy.sort(function () {
        return Math.random() - 0.5;
      });
      return shuffled.slice(0, n);
    },
  };
})();
