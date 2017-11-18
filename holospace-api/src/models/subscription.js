import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  subscriber_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  channel_id: {
    type: Schema.ObjectId,
    ref: 'Channel'
  },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true } );

const autoPopulateChannel = (next) => {
  this.populate({
    path: 'channel_id',
    select: 'avatar name topic-_id'
  });
  next();
};

/*const autoPopulateSubscriber = (next) => {
  this.populate({
    path: 'subscriber_id',
    select: 'avatar username pin -_id'
  });
  next();
};

schema.pre('find', autoPopulateChannel);
schema.pre('find', autoPopulateSubscriber);*/

export default mongoose.model('Subscription', schema);
