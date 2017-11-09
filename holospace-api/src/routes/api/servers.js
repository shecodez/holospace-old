import express from 'express';

var router = express.Router();

import Server from '../../models/server';

// GET holospace.com/api/servers
// get list of servers
router.get('/servers', (req, res) => {
  Server.find({}, (err, servers) => {
		if (err)
			return res.send(err);

		res.json(servers);
	});
});

// GET holospace.com/api/servers/:id
// get one server by id
router.get('/servers/:id', (req, res) => {
  Server.findById(req.params.id, (err, server) => {
		if (err)
			return res.send(err);

		res.json(server);
	});
});

// POST holospace.com/api/servers/:params
// create new server,
// create new channel (named general) belonging to server,
// create new membership between user and server
router.post('/servers', (req, res) => {
  var server = new Server();

	server.name = req.body.name;
  server.private = req.body.private;
	server.lang = req.body.lang;

	server.save((err) => {
		if (err)
			return res.send(err);

		res.json(server);
	});//.then(createGeneralChannel, createMembership);
});

// PUT holospace.com/api/servers/:params
// update a server
router.put('/servers/:id', (req, res) => {
	Server.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, server) => {
		if (err)
			return res.send(err);

		res.json(server);
	});
});

// DELETE holospace.com/api/servers/:id
// delete a server
router.delete('/servers/:id', (req, res) => {
  Server.findByIdAndRemove(req.params.id, (err, server) => {
		if (err)
			return res.send(err);

		res.json(server);
	});//.then(deleteChannel(s), deleteMembership(s));
});

module.exports = router;
