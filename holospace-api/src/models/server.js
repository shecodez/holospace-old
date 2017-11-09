import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field required']
  },
  private: {
    type: Boolean,
    default: false
  },
  lang: {
    type: String,
    enum: ['EN', 'JP']
  }
}, { timestamps: true } );

export default mongoose.model('Server', schema);
