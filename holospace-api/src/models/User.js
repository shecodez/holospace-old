import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  avatar: {
    type: String,
    default: 'imgs/default/user_avatar.png'
  },
  username: {
    type: String,
    minlength: [3, 'Username too short.'],
    lowercase: true,
    index: true,
    required: true
  },
  /*nickname: String,*/
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
// TODO: add encryption to password field

export default mongoose.model('User', schema);
