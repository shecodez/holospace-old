import express from 'express';
import Subscription from '../../controllers/subscriptionCtrl';
// import authenticate from '../middlewares/authenticate';

var router = express.Router();
// router.use(authenticate);

// GET holospace.com/api/subscriptions
// get list of subscriptions
router.get('/subscriptions', Subscription.getAll);

// GET holospace.com/api/subscriptions/:id
// get one subscription by id
router.get('/subscriptions/:id', Subscription.getOne);

// POST holospace.com/api/subscriptions/:params
// create new subscription
router.post('/subscriptions', Subscription.create);

// PUT holospace.com/api/subscriptions/:params
// update a subscription
// router.put('/subscriptions/:id', Subscription.update);

// DELETE holospace.com/api/subscriptions/:id
// 'delete' a subscription
router.delete('/subscriptions/:id', Subscription.delete);

module.exports = router;
