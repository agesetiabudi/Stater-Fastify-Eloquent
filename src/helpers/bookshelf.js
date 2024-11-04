'use strict';

const connection = require('../helpers/knexfile');
const Knex = require('knex')(connection);
const Bookshelf = require('bookshelf')(Knex);

// Bookshelf supported plugins.
Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');

// Community plugins.
Bookshelf.plugin(require('bookshelf-eloquent'));

module.exports = Bookshelf;
