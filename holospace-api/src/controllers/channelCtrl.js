import db from './../models';

const channelController = {};

channelController.getAll = (req, res) => {
  db.Channel.find({}).then((channels) => {
    return res.status(200).json(channels);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

channelController.getOne = (req, res) => {
  db.Channel.findById(req.params.id).populate({
    path: 'server_id',
    select: 'name -_id'
  }).then((channel) => {
    return res.status(200).json(channel);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

// create new channel
// if channel.direct create subscriptions
channelController.create = (req, res) => {
  const {
    avatar,
    name,
    topic,
    type,
    direct,
    server_id
  } = req.body;

  // Validations

  const channel = new db.Channel({
    avatar,
    name,
    topic,
    type,
    direct,
    server_id
  });

  channel.save().then((newChannel) => {
    //...
    return res.status(200).json(newChannel);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

channelController.update = (req, res) => {
  db.Channel.findByIdAndUpdate(
    req.params.id,

    // Validations
    req.body,

    {new: true}
  ).then((updatedChannel) => {
    res.status(200).json(updatedChannel);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

channelController.delete = (req, res) => {
  db.Channel.findByIdAndUpdate(
    req.params.id,

    {isDeleted: true},

    {new: true}
  ).then((updatedChannel) => {
    res.status(200).json('Channel successfully deleted.');
  }).catch((err) => {
    res.status(500).json(err);
  });
};


export default channelController;
