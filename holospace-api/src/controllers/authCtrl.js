import db from './../models';

const authController = {};

authController.login = (req, res) => {
  return res.status(400).json({
    errors: { global: "Invalid credentials"}
  });
  /*const {
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
  });*/
};

export default authController;
