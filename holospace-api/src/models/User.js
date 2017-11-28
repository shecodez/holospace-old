import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema({

  email: {
    type: String,
    lowercase: true,
    index: true,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    default: 'http://res.cloudinary.com/shecodez/image/upload/c_scale,w_250/v1509243733/default_pmmlaf.png'
  },
  name: String,
  /* nickname: String, */
  username: {
    type: String,
    minlength: [4, 'Username too short.'],
    required: true
  },
  pin: Number,
  password: {
    type: String,
    minlength: [6, 'Password too short.'],
    required: true
  },
  online: Boolean,
  status: {
    type: String,
    enum: ['Away', 'Busy', 'Show', 'Hide'],
    default: 'Show'
  },
  confirmationToken: {
    type: String,
    default: ''
  },
  passwordResetToken: {
    type: String,
    default: ''
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

schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
}

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
  return `${process.env.HOST}/confirmation/${this.confirmationToken}`
}

schema.methods.generatePasswordResetRequestUrl = function generatePasswordResetRequestUrl() {
  //return `${process.env.HOST}/reset_password/${this.passwordResetToken}`
  return `${process.env.HOST}/reset_password/${this.generateToken()}`
}

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
      avatar: this.avatar,
      username: this.username,
      pin: this.pin,
      online: this.online || false,
      status: this.status,
      confirmed: this.confirmed
    },
    process.env.JWT_SECRET || "secret"
  );
};

schema.methods.generateToken = function generateToken() {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
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
