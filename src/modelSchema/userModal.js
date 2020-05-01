var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  name: String,
  username: String,
  pass: String,
  surplus: Number
})

var AddUser = mongoose.model('User', userSchema)

module.exports = AddUser
