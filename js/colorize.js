'use strict';

(function () {

  window.WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  window.WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  window.WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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
