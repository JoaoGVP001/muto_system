const express = require('express');
const router = express.Router();
const dataLoader = require('../controllers/dataLoaderController');
const credentialController = require('../controllers/credentialController');

router.get('/dataloader/basicdata', credentialController.JWTmiddleware, dataLoader.basicDataController);

module.exports = router;