const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebPage = new Schema({
  name: {require: true, type: String},
  category: {require: true, type: String},
  seguidores: { default: 0, type: Number }
});

module.exports = mongoose.model('WebPage', WebPage);
