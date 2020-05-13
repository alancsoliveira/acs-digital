const express = require('express');

const FamilyController = require('./controllers/FamilyController');
const PersonController = require('./controllers/PersonController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/family', FamilyController.index);
routes.delete('/family/:id', FamilyController.delete);
routes.post('/family', FamilyController.create);

routes.get('/profile', ProfileController.index);

routes.post('/person', PersonController.create);
routes.delete('/person/:id', PersonController.delete);
routes.get('/person', PersonController.index);


module.exports = routes;