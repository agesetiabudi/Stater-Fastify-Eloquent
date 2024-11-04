'use strict';

const Bookshelf = require('../helpers/bookshelf');

module.exports = Bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: ['created_at', 'updated_at'],
  // hidden: [
  //   'password',
  // ],
  softDelete: false,

  // Format data coming from the database.
  parse: function(response) {
    // NOTE: mysql does not support boolean columns
    // Example: Cast mysql tinyint column to boolean.
    if (response.allowUseOfMyContactInformation != null)
      response.allowUseOfMyContactInformation = !!+response.allowUseOfMyContactInformation;
    return response;
  },

});
