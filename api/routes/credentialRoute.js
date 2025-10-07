const express = require('express');
const router = express.Router();
const credentialController = require('../controllers/credentialController');

router.post('/adm/signup', credentialController.AdmSignUpController);
router.post('/adm/login', credentialController.AdmLoginController);
router.post('/user/signup', credentialController.UserSignUpController);
router.post('/user/login', credentialController.UserLoginController);

module.exports = router;