var mongoose = require('mongoose');


var Schema = mongoose.Schema;

userSchema = new Schema( {
	email: String,
	username: String,
	password: String,
	passwordConf: String
})

module.exports = mongoose.model('User', userSchema);
