var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
// user schema
var UserSchema = new Schema({
	name: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false }
});

UserSchema.pre('save', function(next) {
	var user = this;

	if (!user.isModified('password')) return next();
	// generate the hash
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);
		// change the password to the hashed version
		user.password = hash;
		next();
	});
});
// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
};
// return the model
module.exports = mongoose.model('User', UserSchema);