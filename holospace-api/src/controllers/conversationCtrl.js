import db from "./../models";

const conversationController = {};

conversationController.create = (req, res, next) => {
  const { recipient, body } = req.body.message;

  // Validations
  if (!recipient) {
    res.status(422).send({ error: 'Invalid recipient' });
    return next(err);
  }

  if(!body) {
    res.status(422).send({ error: 'Message connot be blank' });
    return next(err);
  }

  const conversation = new db.Conversation({
    participants: [req.currentUser._id, req.params.recipient]
  });

  conversation.save((err, newConversation) {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    const message = new db.Message({
      conversation_id: newConversation._id,
      body: req.body.message,
      author_id: req.currentUser._id
    });

    message.save((err, newMessage) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id })
      return next();
    });
  });
};
