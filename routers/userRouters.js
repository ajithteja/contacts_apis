const express = require('express');
const {
  userRejister,
  userLogin,
  currentUser,
} = require('../controllers/userController');
const validateToken = require('../middleware/validationTokenHandler');

const userRoute = express.Router();

userRoute.post('/register', validateToken, userRejister);
userRoute.post('/login', userLogin);
userRoute.get('/currentuser', validateToken, currentUser);

module.exports = userRoute;
