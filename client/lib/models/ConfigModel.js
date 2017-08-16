var BaseModel = require('cork-app-utils').BaseModel;
var config = require('../config');

class ConfigModel extends BaseModel {

  constructor() {
    super();
    this.registerIOC('ConfigModel');
  }

  async get() {
    return config;
  }

}

module.exports = new ConfigModel();