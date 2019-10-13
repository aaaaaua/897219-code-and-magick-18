'use strict';

(function () {
  window.colorize = function (element, colorType, input) {
    element.addEventListener('click', function () {
      var color = window.utils.getRandomArrValue(colorType);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
        input.value = color;
      } else {
        element.style.fill = color;
        input.value = color;
      }
    });
  };
})();
