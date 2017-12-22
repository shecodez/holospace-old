import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field required']
  },
  icon: {
    type: String,
    default: ""
  },
  default_id: {
    type: Schema.ObjectId,
    ref: 'Channel'
  },
  owner_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  inviteCode: {
    type: String,
    default: ""
  },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true } );

schema.methods.setDefaultId = function setDefaultId(id) {
  this.default_id = id;
}

/*const autoPopulateOwner = (next) => {
  this.populate({
    path: 'owner_id',
    select: 'username -_id'
  });
  next();
};

schema.pre('find', autoPopulateOwner);

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    _id: this._id,
    name: this.name,
    icon: this.icon,
    default_id: this.default_id
  }
};*/

export default mongoose.model('Server', schema);
