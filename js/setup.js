'use strict';

(function () {
  var setupUserWizard = document.querySelector('.setup-wizard');

  var wizardCoat = setupUserWizard.querySelector('.wizard-coat');
  var wizardCoatInput = document.querySelector('input[name=coat-color]');

  var wizardEyes = setupUserWizard.querySelector('.wizard-eyes');
  var wizardEyesInput = document.querySelector('input[name=eyes-color]');

  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = wizardFireball.querySelector('input');


  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц Онопко', 'Топольницкая', 'Нионго Ирвинг'];
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  // функция создания персонажа
  var makeWizard = function (name, lastName, coatColor, eyesColor) {
    var wizard = {
      name: window.utils.getRandomArrValue(name) + ' ' + window.utils.getRandomArrValue(lastName),
      coatColor: window.utils.getRandomArrValue(coatColor),
      eyesColor: window.utils.getRandomArrValue(eyesColor)
    };

    return wizard;
  };

  // функция создания массива персонажей
  var makeWizardsArr = function () {
    var wizards = [];
    for (var i = 0; i < 4; i++) {
      wizards.push(makeWizard(WIZARD_NAMES, WIZARD_LAST_NAMES, WIZARD_COAT_COLOR, WIZARD_EYES_COLOR));
    }
    return wizards;
  };

  var wizards = makeWizardsArr();

  // функция создания DOM-элемента на основе JS-объекта
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };


  var createWizzards = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  createWizzards();

  window.colorize(wizardCoat, WIZARD_COAT_COLOR, wizardCoatInput);
  window.colorize(wizardEyes, WIZARD_EYES_COLOR, wizardEyesInput);
  window.colorize(wizardFireball, WIZARD_FIREBALL_COLOR, wizardFireballInput);
})();
