import express from 'express';

var router = express.Router();

import Server from '../../controllers/serverCtrl';

// GET holospace.com/api/servers
// get list of servers
router.get('/servers', Server.getAll);

// GET holospace.com/api/servers/:id
// get one server by id
router.get('/servers/:id', Server.getOne);

// POST holospace.com/api/servers/:params
// create new server
router.post('/servers', Server.create);

// PUT holospace.com/api/servers/:params
// update a server
router.put('/servers/:id', Server.update);

// DELETE holospace.com/api/servers/:id
// 'delete' a server
router.put('/servers/:id', Server.delete);

module.exports = router;
