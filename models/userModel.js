const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    default: "user"
  },
  permission: {
    type: Boolean,
    default: true
  },
}, { timestamps: true });

userSchema.statics.signup = async function (username, password, name, lastname, number, subject) {
  if (!username || !password || !number || !subject || !name || !lastname) {
    throw new Error('All fields must be filled');
  }

  const exists = await this.findOne({ username });
  if (exists) {
    throw new Error('Username already exists');
  }

  const user = await this.create({ username, password, name, lastname, number, subject });
  return user;
};

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw new Error('All fields must be filled');
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw new Error('Incorrect username');
  }

  if (user.password !== password) {
    throw new Error('Incorrect password');
  }

  if (!user.permission) {
    throw new Error('Access denied');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
