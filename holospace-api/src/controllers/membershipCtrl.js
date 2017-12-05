import db from './../models';
import parseErrors from '../utils/parseErrors';

const membershipController = {};

membershipController.getAll = (req, res) => {
  db.Membership.find({}).then((memberships) => {
    return res.status(200).json(memberships);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

membershipController.getMemberServers = (req, res) => {
  let servers = [];
  let promise = db.Membership.find({
      member_id: req.currentUser._id
    })
    .where('isDeleted').equals(false)
    .populate({
      path: 'server_id',
      select: 'icon name',
      match: {
        'isDeleted': false
      }
    }).exec((err, memberships) => {
      if (err)
        return console.log(err);
      memberships = memberships.filter(function(membership) {
        servers.push(membership.server_id);
      });
    });
    promise.then((memberships) => {
      return res.status(200).json({ servers });
    }).catch(err => {
      return res.status(400).json({
        errors: parseErrors(err.errors)
      });
    });
};

membershipController.getServerMembers = (req, res) => {
  db.Membership.find({
    server_id: req.params.serverId
  }).populate({
    path: 'member_id',
    select: 'avatar username pin email -_id',
    match: {
      'isDeleted': false
    }
  }).then((members) => {
    return res.status(200).json(members);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

membershipController.getOne = (req, res) => {
  db.Membership.findById(req.params.id).then((membership) => {
    return res.status(200).json(membership);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

membershipController.create = (req, res) => {
  const {
    member_id,
    server_id
  } = req.body.membership;

  // Validations

  const membership = new db.Membership({
    member_id,
    server_id
  });

  membership.save().then((newMembership) => {
    //...
    return res.status(200).json(newMembership);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

membershipController.delete = (req, res) => {
  db.Membership.findByIdAndUpdate(
    req.params.id,

    {
      isDeleted: true
    },

    {
      new: true
    }
  ).then((updatedMembership) => {
    res.status(200).json('Membership successfully deleted.');
  }).catch((err) => {
    res.status(500).json(err);
  });
};


export default membershipController;
