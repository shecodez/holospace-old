import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema({
  avatar: {
    type: String,
    default: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png'
  },
  name: String,
  /*nickname: String,*/
  username: {
    type: String,
    minlength: [3, 'Username too short.'],
    lowercase: true,
    index: true,
    required: true,
    unique: true
  },
  pin: Number,
  email: {
    type: String,
    lowercase: true,
    index: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: [6, 'Password too short.'],
    required: true
  },
  online: {
    type: String,
    enum: ['Away', 'Busy', 'Show', 'Hide'],
    default: 'Show'
  },
  confirmed: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

// TODO: add uniqueness and email validations to email field

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.hashPassword = function hashPassword(password) {
  this.password = bcrypt.hashSync(password, 10);
}

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email
    },
    process.env.JWT_SECRET || "secret"
  );
};

schema.methods.generatePin = function generatePin() {
  var pin = Math.round(Math.random() * 10000);
  if (pin < 1000) { pin += 1000; }

  this.pin = pin;
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    avatar: this.avatar,
    username: this.username,
    pin: this.pin,
    online: this.online,
    confirmed: this.confirmed,
    token: this.generateJWT()
  }
};

schema.plugin(uniqueValidator, { message: '{PATH} already in use' });

export default mongoose.model('User', schema);
