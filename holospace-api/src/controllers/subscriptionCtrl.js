import db from './../models';

const subscriptionController = {};

subscriptionController.getAll = (req, res) => {
  db.Subscription.find({}).then((subscriptions) => {
    return res.status(200).json(subscriptions);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

subscriptionController.getOne = (req, res) => {
  db.Subscription.findById(req.params.id).then((subscription) => {
    return res.status(200).json(subscription);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};

subscriptionController.create = (req, res) => {
  const {
    subscriber_id,
    channel_id
  } = req.body;

  // Validations

  const subscription = new db.Subscription({
    subscriber_id,
    channel_id
  });

  subscription.save().then((newSubscription) => {
    //...
    return res.status(200).json(newSubscription);
  }).catch((err) => {
    return res.status(500).json(err);
  });
};


subscriptionController.delete = (req, res) => {
  db.Subscription.findByIdAndUpdate(
    req.params.id,

    {isDeleted: true},

    {new: true}
  ).then((updatedSubscription) => {
    res.status(200).json('Subscription successfully deleted.');
  }).catch((err) => {
    res.status(500).json(err);
  });
};


export default subscriptionController;
