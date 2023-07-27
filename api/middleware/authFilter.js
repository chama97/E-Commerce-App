const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
require('dotenv').config();

const authFilter = async (req, res, next) => {
  try {
    if (req.path.startsWith('/auth/')) {
      return next();
    }

    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decoded._id).exec();

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ error: 'Token is expired' });
      }

      res.status(401).json({ error: 'Invalid Token' });
    }
  } catch (error) {
    console.error('Exception:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = authFilter;
