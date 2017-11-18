import decode from "jwt-decode";
import jwt from "jsonwebtoken";
import db from './../models';
import { sendResetPasswordEmail } from '../mailer';

const authController = {};

authController.login = (req, res) => {
  const { credentials } = req.body;

  db.User.findOne({ email: credentials.email}).then(user => {
    if (user && user.isValidPassword(credentials.password)) {
      return res.status(200).json({
        user: user.toAuthJSON()
      });
    } else {
      return res.status(400).json({
        errors: { global: "Invalid credentials" }
      });
    }
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

authController.confirm = (req, res) => {
  db.User.findOneAndUpdate(
    { confirmationToken: req.body.token },
    { confirmationToken: "", confirmed: true },
    { new: true }
  ).then(confirmedUser => {
    if (confirmedUser) {
      return res.status(200).json({
        user: confirmedUser.toAuthJSON()
      });
    } else {
      /*jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(400).json({
            errors: { global: "Invalid token" }
          });
        } else {
          const user = db.User.findOne({ email: decoded.email}).then(user => {
            if (user.confirmed) {
              return res.status(400).json({
                errors: { global: "User already confirmed" }
              });
            }
          }).catch(err => { res.json({}) });
        }
      });*/
      try {
        const payload = decode(req.body.token);
        const user = db.User.findOne({ email: payload.email})
          .then(user => {
            if (user.confirmed) {
              return res.status(400).json({
                errors: { global: "User already confirmed" }
              });
            }
          }).catch(err => { res.json({}) });
      } catch (e) {
        return res.status(400).json({
          errors: { global: "Invalid token" }
        });
      }
    }
  });
}

authController.resetPasswordRequest = (req, res) => {
  db.User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // user.createPasswordResetToken();
      sendResetPasswordEmail(user);
      return res.status(200).json({});
    }
  });
};

authController.validateToken = (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
    if (err) {
      return res.status(401).json({
        errors: { global: "Invalid token" }
      });
    } else {
      return res.status(200).json({});
    }
  });
};

authController.resetPassword = (req, res) => {
  const { password, token } = req.body.data;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        errors: { global: "Invalid token" }
      });
    } else {
      db.User.findOne({ _id: decoded._id }).then(user =>{
        if (user) {
          user.hashPassword(password);
          user.save().then(() => res.json({}));
        } else {
          return res.status(404).json({
            errors: { global: "Invalid token" }
          });
        }
      });
    }
  });
};

export default authController;
