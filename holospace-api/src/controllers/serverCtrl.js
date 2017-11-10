import db from './../models';

const serverController = {};

serverController.getAll = (req, res) => {
  db.Server.find({}).populate({
    path: 'owner',
    select: 'username -_id'
    //,match: { 'isDeleted': false }
  }).then((servers) => {
    return res.status(200).json(servers);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

serverController.getOne = (req, res) => {
  db.Server.findById(req.params.id).populate({
    path: 'owner',
    select: 'username -_id'
  }).then((servers) => {
    return res.status(200).json(servers);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

// create new server,
// create new channel (named general) belonging to server,
// create new membership between user and server
serverController.create = (req, res) => {
  const {
    name,
    icon_url,
    owner
  } = req.body;

  // Validations

  const server = new db.Server({
    name,
    icon_url,
    owner
  });

  server.save().then((newServer) => {
    //...
    return res.status(200).json(newServer);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

serverController.update = (req, res) => {
  db.Server.findByIdAndUpdate(
    req.params.id,

    // Validations
    req.body,

    {new: true}
  ).then((updatedServer) => {
    res.status(200).json(updatedServer);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

serverController.delete = (req, res) => {
  db.Server.findByIdAndUpdate(
    req.params.id,

    {isDeleted: true},

    {new: true}
  ).then((updatedServer) => {
    res.status(200).json('Server successfully deleted.');
  }).catch((err) => {
    res.status(500).json(err);
  });
};


export default serverController;
