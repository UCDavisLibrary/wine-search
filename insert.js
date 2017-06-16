var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'http://elastic:changeme@localhost:9200',
  log: 'trace'
});

var marks = require('./data/marks');

async function insertMarks() {

  try {
    for( var i = 0; i < marks.length; i++ ) {
      var mark = marks[i];
      await client.index({
        index : 'test',
        type : 'mark',
        id : mark.mark_id,
        body : mark
      });
    }
  } catch(e) {
    throw e;
  }

}


insertMarks().catch((e) => {throw e});