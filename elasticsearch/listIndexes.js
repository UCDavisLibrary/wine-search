var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'http://elastic:changeme@elasticsearch:9200',
  log: 'error'
});

(async function(){
  var resp = await client.cat.indices({v: true});
  console.log(resp);
})();