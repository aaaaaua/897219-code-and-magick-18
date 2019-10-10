'use strict';
var hidden = 'hidden';

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userName = document.querySelector('.setup-user-name');

var setupUserWizard = document.querySelector('.setup-wizard');

var wizardCoat = setupUserWizard.querySelector('.wizard-coat');
var wizardCoatInput = document.querySelector('input[name=coat-color]');

var wizardEyes = setupUserWizard.querySelector('.wizard-eyes');
var wizardEyesInput = document.querySelector('input[name=eyes-color]');

var wizardFireball = document.querySelector('.setup-fireball-wrap');
var wizardFireballInput = wizardFireball.querySelector('input');


var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц Онопко', 'Топольницкая', 'Нионго Ирвинг'];

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
    wizards.push(makeWizard(WIZARD_NAMES, WIZARD_LAST_NAMES, window.WIZARD_COAT_COLOR, window.WIZARD_EYES_COLOR));
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

// Реальзация открытия закрытия окна настройки персонажа

var onPopupEscPress = function (evt) {
  window.utils.isEscEvent(evt, closePopup);
};

var openPopup = function () {
  setup.classList.remove(hidden);
  document.addEventListener('keydown', onPopupEscPress);

  userName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  userName.addEventListener('focusout', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setup.style.cssText = '';
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  window.utils.isEnterEvent(evt, openPopup);
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  window.utils.isEnterEvent(evt, closePopup);
});

window.colorize(wizardCoat, window.WIZARD_COAT_COLOR, wizardCoatInput);
window.colorize(wizardEyes, window.WIZARD_EYES_COLOR, wizardEyesInput);
window.colorize(wizardFireball, window.WIZARD_FIREBALL_COLOR, wizardFireballInput);
