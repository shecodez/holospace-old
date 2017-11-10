import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema({
  avatar: {
    type: String,
    default: 'imgs/default/user_avatar.png'
  },
  name: String,
  username: {
    type: String,
    minlength: [3, 'Username too short.'],
    lowercase: true,
    index: true,
    required: true
  },
  /*nickname: String,*/
  pin: Number,
  email: {
    type: String,
    lowercase: true,
    index: true,
    required: true
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
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

// TODO: add uniqueness and email validations to email field

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email
    },
    process.env.JWT_SECRET || "secret"
  );
};

schema.methods.authToJSON = function authToJSON() {
  return {
    avatar: this.avatar,
    username: this.username,
    pin: this.pin,
    online: this.online,
    token: this.generateJWT()
  }
};

export default mongoose.model('User', schema);
