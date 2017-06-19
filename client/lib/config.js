module.exports = {
  // facets to show on left side
  // filter : label
  facets : {
    vintage : {
      label : 'Vintage',
      type : 'facet'
    },
    'bottletype.raw' : {
      label : 'Bottle Type',
      type : 'facet'
    },
    'winetype.raw' : {
      label : 'Wine Type',
      type : 'facet'
    },
    perprice : {
      label : 'Bottle Price',
      type : 'range'
    }
  },
  
  // max number of facets filter options
  maxFacetCount : 10
}