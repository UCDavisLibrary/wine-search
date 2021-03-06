module.exports = {
  // facets to show on left side
  // filter : label
  facets : {
    'color.raw' : {
      label : 'Color',
      type : 'facet'
    },
    'winetype.raw' : {
      label : 'Wine Type',
      type : 'facet'
    },
    vintage : {
      label : 'Vintage',
      type : 'range'
    },
    publication_date : {
      label : 'Published',
      type : 'range'
    },
    perprice : {
      label : 'Bottle Price',
      type : 'range',
      isDollar : true
    },
    'country.raw' : {
      label : 'Country',
      type : 'facet'
    },
    'bottletype.raw' : {
      label : 'Bottle Size',
      type : 'facet'
    }
  },
  
  // max number of facets filter options
  maxFacetCount : 10
}