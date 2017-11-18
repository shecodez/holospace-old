import db from './../models';

const messageController = {};

messageController.getAll = (req, res) => {
  db.Message.find({}).then((messages) => {
    return res.status(200).json(messages);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

messageController.getOne = (req, res) => {
  db.Message.findById(req.params.id).then((message) => {
    return res.status(200).json(message);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

messageController.create = (req, res) => {
  const {
    body,
    author_id,
    server_id
  } = req.body;

  // Validations

  const message = new db.Message({
    body,
    author_id,
    server_id
  });

  message.save().then((newMessage) => {
    //...
    return res.status(200).json(newMessage);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

messageController.update = (req, res) => {
  db.Message.findByIdAndUpdate(
    req.params.id,

    // Validations
    req.body,

    {new: true}
  ).then((updatedMessage) => {
    res.status(200).json(updatedMessage);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

messageController.delete = (req, res) => {
  db.Message.findByIdAndUpdate(
    req.params.id,

    {isDeleted: true},

    {new: true}
  ).then((updatedMessage) => {
    res.status(200).json('Message successfully deleted.');
  }).catch((err) => {
    res.status(500).json(err);
  });
};


export default messageController;
