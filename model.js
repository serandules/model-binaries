var log = require('logger')('model-binaries');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongins = require('mongins');
var validators = require('validators');
var model = require('model');

var types = validators.types;

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

model.ensureIndexes(binary, [
  {createdAt: 1, _id: 1}
]);

module.exports = mongoose.model('binaries', binary);
