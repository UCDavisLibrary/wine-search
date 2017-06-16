var request = require('superagent');

function search(body) {
  return request.post('/search').send(body);
}

module.exports = {
  search
}