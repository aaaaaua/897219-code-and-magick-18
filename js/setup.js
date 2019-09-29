'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
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
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// случайное значение из массива
var getRandomArrValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// функция создания персонажа
var makeWizard = function (name, lastName, coatColor, eyesColor) {
  var wizard = {
    name: getRandomArrValue(name) + ' ' + getRandomArrValue(lastName),
    coatColor: getRandomArrValue(coatColor),
    eyesColor: getRandomArrValue(eyesColor)
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

// Реальзация открытия закрытия окна настройки персонажа

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
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
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// функции для изменения цвета персонажа по клику
var setWizardCoatColor = function (coatColorArr) {
  var coatCollor = getRandomArrValue(coatColorArr);
  wizardCoat.style.fill = coatCollor;
  wizardCoatInput.value = coatCollor;
};
var setWizardEyesColor = function (eyesColorArr) {
  var eyesCollor = getRandomArrValue(eyesColorArr);
  wizardEyes.style.fill = eyesCollor;
  wizardEyesInput.value = eyesCollor;
};
var setWizardFireballColor = function (fireballColorArr) {
  var fireballCollor = getRandomArrValue(fireballColorArr);
  wizardFireball.style.backgroundColor = fireballCollor;
  wizardFireballInput.value = fireballCollor;
};

wizardCoat.addEventListener('click', function () {
  setWizardCoatColor(WIZARD_COAT_COLOR);
});
wizardEyes.addEventListener('click', function () {
  setWizardEyesColor(WIZARD_EYES_COLOR);
});
wizardFireball.addEventListener('click', function () {
  setWizardFireballColor(WIZARD_FIREBALL_COLOR);
});
