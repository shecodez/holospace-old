import express from 'express';

var router = express.Router();

import Auth from '../../controllers/authCtrl';

// POST holospace.com/api/auth
// login user
router.post('/auth', Auth.login);

// POST holospace.com/api/auth/confirmation
// Confirm user email
router.post('/auth/confirmation', Auth.confirm);

module.exports = router;
