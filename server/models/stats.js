var db = require('../lib/database');
var config = require('../config');

var AGG_TEMPLATE_BODY = {
  "size": 0,
  "query": {
    "bool": {
      "filter": [
        {
          "terms": {
            "country.raw": [
              "[[replace]]"
            ]
          }
        }
      ]
    }
  },
  "aggs": {
    "yearly_price": {
      "histogram": {
        "field": "vintage",
        "interval": -1
      },
      "aggs": {
        "price": {
          "sum": {
            "field": "perprice2017"
          }
        }
      }
    }
  }
}

var KEYS_TEMPLATE_BODY = {
  size : 0,
  aggs : {
    keys : {
      terms : {
        field : '',
        size : 10
      }
    }
  }
};

class DBStats {

  async stats(field, interval = 10) {

    KEYS_TEMPLATE_BODY.aggs.keys.terms.field = field;

    var resp = await db.search({
      index : config.elasticsearch.index,
      body : KEYS_TEMPLATE_BODY
    });


    var result = {};
    var aggresp;

    AGG_TEMPLATE_BODY.aggs.yearly_price.histogram.interval = parseInt(interval);
    for( var i = 0; i < resp.aggregations.keys.buckets.length; i++ ) {
      AGG_TEMPLATE_BODY.query.bool.filter[0] = {
          term: {
            [field]: resp.aggregations.keys.buckets[i].key
          }
        };

      aggresp = await db.search({
        index : config.elasticsearch.index,
        body : AGG_TEMPLATE_BODY
      });

      var buckets = aggresp.aggregations.yearly_price.buckets;
      buckets.forEach((bucket) => {
        if( !result[bucket.key] ) result[bucket.key] = [];

        result[bucket.key].push({
          field : resp.aggregations.keys.buckets[i].key,
          count : bucket.doc_count,
          price : bucket.price.value,
          average : bucket.price.value / bucket.doc_count
        });
      })
    }


    return result;


  }

}

module.exports = new DBStats();