import db from './../models';
import parseErrors from '../utils/parseErrors';

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
  }).then((server) => {
    return res.status(200).json(server);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

// create new server,
// create new membership between user and server
// create new channel (named general) belonging to server,
serverController.create = (req, res) => {
  const {
    name,
    icon
  } = req.body.server;
  const owner_id = req.currentUser._id;

  // Validations

  const server = new db.Server({
    name,
    icon,
    owner_id
  });

  server.save().then((newServer) => {

    const membership = new db.Membership({
      member_id: newServer.owner_id,
      server_id: newServer._id
    });
    membership.save();

    const channel = new db.Channel({
      name: "general",
      server_id: newServer._id
    });
    channel.save().then(channel => {
      newServer.setDefaultId(channel._id);
      newServer.save();

      return res.status(200).json(newServer);
    });

    // return res.status(200).json(newServer);
  }).catch((err) => {
    return res.status(400).json({
      errors: parseErrors(err.errors)
    });
  });
};

serverController.update = (req, res) => {
  db.Server.findByIdAndUpdate(req.params.id,

    // Validations
    /*
    {
      $set: {
        "name": req.body.name,
        "icon": req.body.icon
      }
    }
    */
    req.body,

    { new: true }
  ).then((updatedServer) => {
    res.status(200).json(updatedServer);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

serverController.delete = (req, res) => {
  db.Server.findByIdAndUpdate(req.params.id,
    {
      isDeleted: true
    },
    { new: true }
  ).then((deletedServer) => {
    db.Channel.update({ server_id: deletedServer._id },
      {
        $set: { isDeleted: true }
      },
      { multi: true }
    ).then().catch(err => console.error(err));

    db.Membership.update({ server_id: deletedServer._id },
      {
        $set: { isDeleted: true }
      },
      { multi: true }
    ).then().catch(err => console.error(err));
    res.status(200).json('Server successfully deleted.');
  }).catch((err) => {
    res.status(500).json(err);
  });
};


export default serverController;
