import db from './../models';

const userController = {};

userController.getAll = (req, res) => {
  db.User.find({}).then((users) => {
    return res.status(200).json(users);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

userController.create = (req, res) => {
  const {
    avatar,
    username,
    email,
    password
  } = req.body;

  // validations

  const user = new db.User({
    avatar,
    username,
    email,
    password
  });

  user.save().then((newUser) => {
    return res.status(200).json(newUser);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

export default userController;
