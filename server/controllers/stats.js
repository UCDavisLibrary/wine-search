var router = require('express').Router();
var model = require('../models/stats');

router.get('/', async (req, res) => {

  var interval = req.query.interval || 10;
  var filter = req.query.filter;

  try {
    res.send(await model.stats(filter, interval));
  } catch(e) {
    res.send({error: true, message: 'Error with search query', details: errorToDetails(e)});
  }
});

function errorToDetails(e) {
  return {
    message : e.message,
    details : e.details
  }
}

module.exports = router;