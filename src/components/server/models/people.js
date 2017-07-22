const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: { type: 'String', required: true },
  age: { type: 'Number', required: true },
  gender: { type: 'String', enum: ["male", "female"], required: true }
});

module.exports = mongoose.model('People', postSchema);
