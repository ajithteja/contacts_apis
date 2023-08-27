const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const userRejister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(404);
    console.log('eerr');
    throw new Error('All fields of user required');
  }

  let existingUser;
  // try {
  existingUser = await User.findOne({ email });

  // } catch (error) {
  //   return console.log(error);
  // }

  let user;
  if (!existingUser) {
    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      username,
      email,
      password: hashPassword,
    });
  } else {
    return res.status(400).json({ message: 'User already exist' });
  }

  res.status(200).json({ user });
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error({ message: 'All fields required for login' });
  }

  const user = await User.findOne({ email });

  console.log({ user });

  if (!user) {
    return res.status(404).json({ message: 'No user found' });
  }

  if (await bcrypt.compare(password, user.password)) {
    console.log('password correct');
    const secretKey = process.env.ACCESS_SECERT;

    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      secretKey
    );

    console.log({ accessToken });
    let userPayload = {
      user: user.username,
      email: user.email,
      id: user._id,
    };
    console.log({ user, userPayload });
    return res.status(200).json({ accessToken });
  }
  return res.status(200).json({ message: 'Incorrect password' });
});

const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Current user information' });
});
module.exports = { userRejister, userLogin, currentUser };
