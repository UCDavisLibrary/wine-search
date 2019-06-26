var elasticsearch = require('elasticsearch');
var request = require('superagent');
var path = require('path');
var fs = require('fs');

var client = new elasticsearch.Client({
  host: 'http://elastic:changeme@elasticsearch:9200',
  log: 'error'
});

// var MARKS_API = 'https://wine-api.library.ucdavis.edu/prices';
var ALIAS_NAME = 'wine-search';
var SCHEMA_TYPE = 'mark';
var BULK_SIZE = 200;

var marks;
var schema = require('./schema/marks');
var cpi = require('./cpi');

// async function getMarks() {
//   new Promise((resolve, reject) => {
//     const filename = path.join(__dirname, 'data', 'marks.json');
//     const stream = fs.createWriteStream(filename);
    
//     stream.on('close', () => {
//       marks = JSON.parse(fs.readFileSync(filename));
//       resolve();
//     })
    
//     const req = request.get(MARKS_API);
//     req.pipe(stream);
//   });
// }

async function getBoxes() {
  // marks = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'crowd_source_example.json')));
  marks = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'wine_search_entries.json')));
}

async function getCurrentIndexes() {
  var re = new RegExp('^'+ALIAS_NAME);
  var results = [];

  try {
    var resp = await client.cat.indices({v: true, format: 'json'});
    resp.forEach((i) => {
      if( i.index.match(re) ) {
        results.push(i.index);
      }
    })
  } catch(e) {
    throw e;
  }

  return results;
}

async function updateAliases(oldIndexes, newIndex) {
  if( typeof oldIndexes === 'string' ) {
    oldIndexes = [oldIndexes];
  }

  var actions = [];
  oldIndexes.forEach((i) => {
    actions.push({ remove: { index: i, alias: ALIAS_NAME } })
  });
  actions.push({ add: { index: newIndex, alias: ALIAS_NAME } })

  await client.indices.updateAliases({body: {actions}});
}

async function dropIndexes(oldIndexes) {
    if( typeof oldIndexes === 'string' ) {
    oldIndexes = [oldIndexes];
  }

  try {
    for( var i = 0; i < oldIndexes.length; i++) {
      await client.indices.delete({index: oldIndexes[i]});
    }
  } catch(e) {
    throw e;
  }
}

async function createIndex() {
  var newIndexName = `${ALIAS_NAME}-${Date.now()}`;

  try {
    await client.indices.create({
      index: newIndexName,
      body : {
        mappings : {
          mark : schema
        }
      }
    });
  } catch(e) {
    throw e;
  }

  return newIndexName;
}

async function insertMarks(index) {
  try {
    var actions = [];

    for( var i = 0; i < marks.length; i++ ) {
      var mark = marks[i];

      mark['name-suggest'] = (mark.name || '')
                                 .split(' ')
                                 .map(val => val.replace(/\W/g, ''))
                                 .filter(val => val ? true : false);
      
      if( mark.country ) {
        mark['country-suggest'] = mark.country;
      }
      if( mark.section ) {
        mark['section-suggest'] = mark.section;
      }
      
      if( !mark.vintage || mark.vintage < 1600 ) {
        delete mark.vintage;
      }
      
      if( !mark.perprice || mark.perprice > 1000 ) {
        delete mark.perprice;
      }
      if( !mark.caseprice || mark.caseprice > 1000 ) {
        delete mark.caseprice;
      }

      for( var key in mark ) {
        if( !mark[key] ) delete mark[key];
      }

      if( mark.perprice && mark.publication_date ) {
        mark.perprice2017 = calc2017(mark.perprice, mark.publication_date);
      }

      if( mark.bbox && typeof mark.bbox === 'object' ) {
        mark.bbox = JSON.stringify(mark.bbox);
      }

      actions.push({index: { 
        _index: index, 
        _type: SCHEMA_TYPE, 
        _id: mark.mark_id
      }});
      actions.push(mark);

      if( actions.length === BULK_SIZE*2 ) {
        await client.bulk({body: actions})
        actions = [];
      }
    }

    if( actions.length > 0 ) {
      await client.bulk({body: actions});
    }
  } catch(e) {
    throw e;
  }
}

module.exports = async function() {
  // console.log('Fetching current marks from', MARKS_API);
  // console.time('Mark Fetch Time');
  // await getMarks();
  // console.timeEnd('Mark Fetch Time');
  await getBoxes();

  // let c = 0;
  // marks.forEach(mark => {
  //   mark.bbox = JSON.parse(mark.bbox);
  //   if( mark.bbox.coordinates[0][0][0] !== 0 ) {
  //     console.log(mark);
  //     console.log(mark.bbox.coordinates[0]);
  //     c++;
  //   }
  // })
  // console.log(c);

  console.log('Grabbing current indexes')
  var oldIndexes = await getCurrentIndexes();
  console.log('Found indexes', oldIndexes);

  console.log('Creating new index');
  var newIndexName = await createIndex();
  console.log('New index created', newIndexName);
  
  console.log('Populating Index', `${marks.length} marks`);
  console.time('Populating Index Time');
  await insertMarks(newIndexName);
  console.timeEnd('Populating Index Time');

  console.log('Updating aliases');
  await updateAliases(oldIndexes, newIndexName);

  console.log('Removing old indexes', oldIndexes);
  await dropIndexes(oldIndexes);
}

function calc2017(price, year) {
  return parseFloat(((price * cpi['2017']) / cpi[year+'']).toFixed(2));
}