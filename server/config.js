let env = process.env;

module.exports = {
  env : (env.WINE_SEARCH_ENV || 'development'),
  port : (env.WINE_SEARCH_PORT || 4321),
  elasticsearch : {
    username : (env.ELASTIC_SEARCH_USERNAME || 'elastic'),
    password : (env.ELASTIC_SEARCH_PASSWORD || 'changeme'),
    host : (env.ELASTIC_SEARCH_HOST || 'localhost'),
    port : (env.ELASTIC_SEARCH_PORT || 9200),
    log : (env.ELASTIC_SEARCH_LOG || 'trace'),
    index : (env.ELASTIC_SEARCH_INDEX || 'wine-search')
  }
}