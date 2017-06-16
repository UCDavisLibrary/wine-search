# wine-search
Search for wine prices, vintages, etc

## Getting Started

Start ElasticSearch, Kibana and Webapp

```
cd docker/wine-search-dev
docker-compose up
```

You can access services on the following ports
 - ElasticSearch: localhost:9200
 - Kibana: localhost:5601
 - Webapp: localhost:44321

Default Username/password:
elastic/changeme

### Add Sample Data

```
node elasticsearch/init.js
```

Note, this will drop the wine-search index.
