var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'http://elastic:changeme@localhost:9200',
  log: 'trace'
});

var index = 'wine-search';
var marks = require('./data/marks');
var schema = require('./schema/marks');

async function dropIndex() {
  try {
    await client.indices.delete({index});
  } catch(e) {
    throw e;
  }
}

async function createIndex() {
  try {
    await client.indices.create({
      index,
      body : {
        mappings : {
          mark : schema
        }
      }
    });
  } catch(e) {
    throw e;
  }
}

async function insertMarks() {
  try {
    for( var i = 0; i < marks.length; i++ ) {
      var mark = marks[i];

      mark['name-suggest'] = (mark.name || '')
                                 .split(' ')
                                 .map(val => val.replace(/\W/g, ''))
                                 .filter(val => val ? true : false);
      
      if( !mark.vintage || mark.vintage < 1600 ) {
        delete mark.vintage;
      }

      for( var key in mark ) {
        if( !mark[key] ) delete mark[key];
      }

      await client.index({
        index : index,
        type : 'mark',
        id : mark.mark_id,
        body : mark
      });
    }
  } catch(e) {
    throw e;
  }
}

try {
  (async function() {

    try {
      await dropIndex();
    } catch(e) {}
    
    await createIndex();
    await insertMarks();
  })()
} catch(e) {
  throw e;
}