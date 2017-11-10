import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field required']
  },
  icon_url: {
    type: String,
    default: '/imgs/default/server_icon.png'
  },
  /*private: {
    type: Boolean,
    default: false
  },*/
  owner: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true } );

/*const autoPopulateOwner = (next) => {
  this.populate({
    path: 'owner',
    select: 'username -_id'
  });
  next();
};

schema.pre('find', autoPopulateOwner);*/

export default mongoose.model('Server', schema);
