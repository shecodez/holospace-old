import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  participants: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  isDeleted: { type: Boolean, default: false },
},
{
  timestamps: true
});

export default mongoose.model('Conversation', schema);
