var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  firstName: { type: String, require: '{PATH} is required!' },
  lastName: { type: String, require: '{PATH} is required!' },
  username: {
    type: String,
    required: '{PATH} is required!',
    unique: true
  },
  salt: { type: String, require: '{PATH} is required!' },
  hashed_pwd: { type: String, require: '{PATH} is required!' },
  roles: [String]
});
userSchema.methods = {
  authenticate: function (passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  hasRole: function (role) {
    return this.roles.indexOf(role) > -1;
  }
}
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
  User.find({}).exec(function (err, collection) {
    if (collection.length === 0) {
      var salt, hash;
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'zed');
      User.create({ firstName: 'Zed', lastName: 'Zunga', username: 'zed', salt: salt, hashed_pwd: hash, roles: ['admin'] });
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'jjaheg');
      User.create({ firstName: 'Jim', lastName: 'Jaheg', username: 'jjaheg', salt: salt, hashed_pwd: hash, roles: [] });
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'joe');
      User.create({ firstName: 'Joe', lastName: 'Eames', username: 'joe', salt: salt, hashed_pwd: hash  });
    }
  });
}

exports.createDefaultUsers = createDefaultUsers;
