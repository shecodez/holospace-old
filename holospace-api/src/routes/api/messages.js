import express from 'express';
import Message from '../../controllers/messageCtrl';
// import authenticate from '../middlewares/authenticate';

var router = express.Router();
// router.use(authenticate);

// GET holospace.com/api/messages
// get list of messages
router.get('/messages', Message.getAll);

// GET holospace.com/api/messages/:id
// get one message by id
router.get('/messages/:id', Message.getOne);

// GET holospace.com/api/messages/channel/:channelId
// get list of channel messages
router.get('/messages/channel/:channelId', Message.getChannelMessages);

// POST holospace.com/api/messages/:params
// create new message
router.post('/messages', Message.create);

// PUT holospace.com/api/messages/:params
// update a message
router.put('/messages/:id', Message.update);

// DELETE holospace.com/api/messages/:id
// 'delete' a message
router.delete('/messages/:id', Message.delete);

module.exports = router;
