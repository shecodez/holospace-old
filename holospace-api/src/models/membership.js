import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  member_id: {
    type: Schema.ObjectId,
    ref: 'User'
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

const autoPopulateMember = (next) => {
  this.populate({
    path: 'member_id',
    select: 'avatar username pin -_id'
  });
  next();
};

schema.pre('find', autoPopulateMember);
schema.pre('find', autoPopulateServer);*/

export default mongoose.model('Membership', schema);
