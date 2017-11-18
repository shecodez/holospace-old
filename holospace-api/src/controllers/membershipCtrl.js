import db from './../models';

const membershipController = {};

membershipController.getAll = (req, res) => {
  db.Membership.find({}).then((memberships) => {
    return res.status(200).json(memberships);
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

    {isDeleted: true},

    {new: true}
  ).then((updatedMembership) => {
    res.status(200).json('Membership successfully deleted.');
  }).catch((err) => {
    res.status(500).json(err);
  });
};


export default membershipController;
