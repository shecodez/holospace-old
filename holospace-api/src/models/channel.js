import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field required']
  },
  topic: {
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    enum: ['Text', 'Voice', 'VR'],
    default: 'Text'
  },
  direct: {
    type: Boolean,
    default: false
  },
  server_id: {
    type: Schema.ObjectId,
    ref: 'Server'
  },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true } );

/*const autoPopulateServer = (next) => {
  this.populate({
    path: 'server_id',
    select: 'icon name -_id'
  });
  next();
};

schema.pre('find', autoPopulateServer);*/

export default mongoose.model('Channel', schema);
