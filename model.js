var log = require('logger')('model-binaries');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongins = require('mongins');
var mongutils = require('mongutils');

var validators = require('validators');

var types = validators.types;
var values = validators.values;

var binary = Schema({
  type: {
    type: String,
    required: true,
    validator: types.binaryType()
  },
  content: {
    type: String,
    required: true,
    validator: types.binary()
  }
}, {collection: 'binaries'});

binary.plugin(mongins());
binary.plugin(mongins.user);
binary.plugin(mongins.createdAt());
binary.plugin(mongins.updatedAt());

mongutils.ensureIndexes(binary, [
  {createdAt: 1, _id: 1}
]);

module.exports = mongoose.model('binaries', binary);