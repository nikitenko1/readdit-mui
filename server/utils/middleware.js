const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(400).json({ msg: 'Invalid Authentication.' });

    const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (!decoded)
      return res.status(400).json({ msg: 'Invalid Authentication.' });

    const user = await User.findOne({ _id: decoded.id }).select('-password');
    if (!user) return res.status(400).json({ msg: 'User does not exist.' });

    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  auth,
};
