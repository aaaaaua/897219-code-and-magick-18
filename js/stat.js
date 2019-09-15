'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_OFFSET_X = 50;
var BAR_OFFSET_Y = 100;
var TEXT_NAMES_Y_OFFSET = 255;
var TEXT_TIMES_Y_OFFSET = 70;
var YOU_SCORE = 'Вы';

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// Случайное значание
var getRandomValue = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

// Отрисовка облака
var renderCloud = function (ctx, x, y, width, color) {
  var offsetHorizontally = 10;
  var offsetVertically = 15;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y);

  for (var i = 1; i <= 18; i = i + 2) {
    ctx.lineTo(x + width - offsetHorizontally, y + offsetVertically * i);
    ctx.lineTo(x + width, y + offsetVertically * (i + 1));
  }

  for (var j = 18; j >= 1; j = j - 2) {
    ctx.lineTo(x, y + offsetVertically * j);
    ctx.lineTo(x + offsetHorizontally, y + offsetVertically * (j - 1));
  }

  ctx.stroke();
  ctx.fill();
};

// Отрисовка результатов
var renderBar = function (ctx, names, times) {
  for (var i = 0; i < names.length; i++) {
    var color = names[i] === YOU_SCORE ? 'rgba(255, 0, 0, 1)' : 'hsl(238, 100%,' + getRandomValue(10, 90) + '%)';
    var maxTime = getMaxElement(times);
    var offset = BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime;

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_OFFSET_X + (BAR_WIDTH + BAR_OFFSET_X) * i, CLOUD_Y + TEXT_TIMES_Y_OFFSET);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_OFFSET_X + (BAR_WIDTH + BAR_OFFSET_X) * i, TEXT_NAMES_Y_OFFSET);
    ctx.fillStyle = color;
    ctx.fillRect(CLOUD_X + BAR_OFFSET_X + (BAR_WIDTH + BAR_OFFSET_X) * i, BAR_OFFSET_Y + offset, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};


window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, '#fff');

  ctx.font = 'bold 16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000000';
  ctx.fillText('Ура вы победили!', 123, 25);
  ctx.fillText('Список результатов:', 123, 45);

  renderBar(ctx, names, times);
};

