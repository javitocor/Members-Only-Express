var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fname: {type: String, required: true, min: 3, max: 20},
    lname: {type: String, required: true, min: 2, max: 20},
    username: {type: String, required: true},
    password: {type: String, required: true, min: 5},
    status: {type: String, required: true},
    image: {type: String},
});

ItemSchema
.virtual('imageUrl')
.get(function () {
  const pathJPG = `/images/${this.image}`;
  return pathJPG;
});

// Virtual for this User instance URL.
UserSchema
.virtual('url')
.get(function () {
  return '/users/'+this._id;
});

// Export model.
module.exports = mongoose.model('User', UserSchema);