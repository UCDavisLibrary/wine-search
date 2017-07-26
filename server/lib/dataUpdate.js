var update = require('../../elasticsearch/update');

var HOURS = 4;
var time = 1000 * 60 * 60 * HOURS;

setInterval(() => {
  try {
    console.log('== Data Update', new Date().toISOString());
    update();
  } catch(e) {
    console.error(e);
  }
}, time);

/**
 * After server has been up for 1min, run update
 */
setTimeout(() => {
  update();
}, 1000 * 60);