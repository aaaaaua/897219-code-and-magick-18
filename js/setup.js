'use strict';

(function () {
  var setupUserWizard = document.querySelector('.setup-wizard');

  var wizardCoat = setupUserWizard.querySelector('.wizard-coat');
  var wizardCoatInput = document.querySelector('input[name=coat-color]');

  var wizardEyes = setupUserWizard.querySelector('.wizard-eyes');
  var wizardEyesInput = document.querySelector('input[name=eyes-color]');

  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = wizardFireball.querySelector('input');

  var LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var SAVE_URL = 'https://js.dump.academy/code-and-magick/';

  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  window.colorize(wizardCoat, WIZARD_COAT_COLOR, wizardCoatInput);
  window.colorize(wizardEyes, WIZARD_EYES_COLOR, wizardEyesInput);
  window.colorize(wizardFireball, WIZARD_FIREBALL_COLOR, wizardFireballInput);

  // функция создания DOM-элемента на основе JS-объекта
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();
    var displayedWizards = window.utils.getRandomArrNValues(wizards, 4);

    for (var i = 0; i < displayedWizards.length; i++) {
      fragment.appendChild(renderWizard(displayedWizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'display: flex; z-index: 100; margin: 0 auto; justify-content: center; align-items: center; background-color: #FA5555; opacity: 0.8; width: 50%; top: 50%; height: 30%;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      node.remove();
    }, 6000);


  };

  window.backend.load(LOAD_URL, onLoad, onError);

  form.addEventListener('submit', function (evt) {
    window.backend.save(SAVE_URL, new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, onError);
    evt.preventDefault();
  });
})();
