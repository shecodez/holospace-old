import db from './../models';
import parseErrors from '../utils/parseErrors';
import { sendConfirmationEmail } from "../mailer";

const userController = {};

userController.getAll = (req, res) => {
  db.User.find({}).then((users) => {
    return res.status(200).json(users);
  }).catch((err) => {
    return res.status(400).json(err);
  });
};

userController.register = (req, res) => {
  const {
    username,
    email,
    password
  } = req.body.user;

  // validations

  const user = new db.User({
    username,
    email
  });
  user.generatePin();
  user.hashPassword(password);
  user.setConfirmationToken();

  user.save().then(newUser => {
    sendConfirmationEmail(newUser);

    return res.status(200).json({
      user: newUser.toAuthJSON()
    });
  }).catch(err => {
    return res.status(400).json({
      errors: parseErrors(err.errors)
    });
  });
};

export default userController;
