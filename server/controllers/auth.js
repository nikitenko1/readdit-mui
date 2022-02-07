const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const SECRET = process.env.ACCESS_TOKEN_SECRET;

const createAccessToken = (payload) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: '10h',
  });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username: { $regex: new RegExp('^' + username + '$', 'i') },
  });

  if (!user) {
    return res
      .status(400)
      .json({ msg: 'No account with this username has been registered.' });
  }

  const credentialsValid = await bcrypt.compare(password, user.passwordHash);

  if (!credentialsValid) {
    return res.status(401).json({ msg: 'Invalid username or password.' });
  }

  const token = createAccessToken({ id: user._id });

  res.status(200).json({
    token,
    username: user.username,
    id: user._id,
    avatar: user.avatar,
    karma: user.karmaPoints.postKarma + user.karmaPoints.commentKarma,
  });
};

const signupUser = async (req, res) => {
  const { username, password } = req.body;

  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ msg: 'Password needs to be atleast 6 characters long.' });
  }

  if (!username || username.length > 20 || username.length < 3) {
    return res
      .status(400)
      .json({ msg: 'Username character length must be in range of 3-20.' });
  }

  const existingUser = await User.findOne({
    username: { $regex: new RegExp('^' + username + '$', 'i') },
  });

  if (existingUser) {
    return res.status(400).json({
      msg: `Username '${username}' is already taken. Choose another one.`,
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  const token = createAccessToken({ id: savedUser._id });

  res.status(200).json({
    token,
    username: savedUser.username,
    id: savedUser._id,
    avatar: savedUser.avatar,
    karma: 0,
  });
};

module.exports = { loginUser, signupUser };
