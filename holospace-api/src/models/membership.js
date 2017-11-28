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
}, { timestamps: true }/*, { toJSON: { virtuals: true } }*/);

/*schema.virtual('member', {
    ref: 'User',
    localField: 'member_id',
    foreignField: '_id'
}); */

export default mongoose.model('Membership', schema);
