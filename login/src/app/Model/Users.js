const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.plugin(slug);

const User = new Schema({
  name: { type: String},
  password: String,
  type: String,
  description: String,
  slug: { type: String, slug: 'name', unique: true }
});

module.exports = mongoose.model('users', User);