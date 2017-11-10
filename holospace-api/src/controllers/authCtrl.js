import db from './../models';

const authController = {};

authController.login = (req, res) => {
  const { credentials } = req.body;

  db.User.findOne({ email: credentials.email}).then(user => {
    if (user && user.isValidPassword(credentials.password)) {
      return res.status(200).json({
        user: user.authToJSON()
      });
    }
  }).catch((err) => {
    return res.status(400).json({
      errors: { global: "Invalid credentials"}
    });
  });
};

export default authController;
