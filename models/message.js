var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    title: {type: String, required: true, min: 3, max: 20},
    text: {type: String, required: true, min: 5, max: 250},
    owner: {type: Schema.ObjectId, ref: 'User', required: true},
    timestamp: {type: Number, required: true, min: 0},
});

// Virtual for this Message instance URL.
MessageSchema
.virtual('url')
.get(function () {
  return '/Message/'+this._id;
});

// Export model.
module.exports = mongoose.model('Message', MessageSchema);