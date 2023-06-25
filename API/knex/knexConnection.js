const knex = require('knex')(require('../knexfile.js')['development']);

module.exports = knex;
