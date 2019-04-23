const mongoose = require('mongoose');

let UserSchema = mongoose.Schema;
const userModel = new UserSchema({
	name    : String,
	age     : Number,
	address : String,
	dob     : {
		type : Date,
		set  : v => new Date(v),
	},
});

const User = mongoose.model('user', userModel);

module.exports.User = User;
