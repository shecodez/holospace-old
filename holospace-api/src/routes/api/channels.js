import express from 'express';
import Channel from '../../controllers/channelCtrl';
// import authenticate from '../middlewares/authenticate';

var router = express.Router();
// router.use(authenticate);

// GET holospace.com/api/channels
// get list of channels
router.get('/channels', Channel.getAll);

// GET holospace.com/api/channels/:id
// get one channel by id
router.get('/channels/:id', Channel.getOne);

// POST holospace.com/api/channels/:params
// create new channel
router.post('/channels', Channel.create);

// PUT holospace.com/api/channels/:params
// update a channel
router.put('/channels/:id', Channel.update);

// DELETE holospace.com/api/channels/:id
// 'delete' a channel
router.delete('/channels/:id', Channel.delete);

module.exports = router;
