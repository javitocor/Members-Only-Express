var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    title: {type: String, required: true, min: 3, max: 20},
    text: {type: String, required: true, min: 5, max: 250},
    owner: {type: Schema.ObjectId, ref: 'User', required: true},
    timestamp: {type : Date, default: Date.now },
});

// Virtual for this Message instance URL.
MessageSchema
.virtual('url')
.get(function () {
  return '/deletemessage/'+this._id;
});

MessageSchema
.virtual('timestamp_formatted')
.get(function () {
  return moment(this.timestamp).format('MMMM Do YYYY, h:mm:ss a');
});

// Export model.
module.exports = mongoose.model('Message', MessageSchema);