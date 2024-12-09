const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  year: { type: Number, required: true },
  semester: { type: Number, required: true },
  link: { type: String, required: true },
});

const Paper = mongoose.model('Paper', paperSchema);

module.exports = Paper;
