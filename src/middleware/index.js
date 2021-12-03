require('dotenv').config();
const middleware = {}
const jwt = require('jsonwebtoken');
const User = require('../models/User');

middleware.verifyToken = async (req, res, next) => {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'No token provided'
    });
  }

  let decode;

  try {
    decode = jwt.verify(token, process.env.SECRET_TOKEN);
    console.log('El decode es: ', decode);
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      auth: false,
      message: 'token expire or incorrect, baby'
    });
  }


  req.userId = decode.identifier;

  const user = await User.findById(req.userId);
  if (!user) {
    return res.json({
      auth: false,
      message: 'No user found'
    });
  }

  req.user = user;

  next();


}

middleware.verifyEmail = async (req, res, next) => {
  const { mail } = req.body;
  const user = await User.findOne({ mail });

  if (user) {
    return res.status(401).json({
      auth: false,
      message: 'this email has already been registered'
    });
  }

  next();
}

module.exports = middleware;