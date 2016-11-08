var mongoose = require('mongoose');

module.exports = mongoose.model('Plant', {
  _id: {
    type: Number
  },
  name: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  }
});
