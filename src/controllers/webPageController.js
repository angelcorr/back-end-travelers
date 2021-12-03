const webPageController = {};
const WebPage = require('../models/web-page');
const md5 = require('md5');
const User = require('../models/User');

webPageController.register = async (req, res) => {
  try {
    const webPage = new WebPage(req.body);

    await webPage.save();

    return res.json({ auth: true, user });
    
  } catch (error) {
    if (error) {
      res.status(400).send(error)
    }
    
    res.status(500).send(error);
  }

}

webPageController.auth = async (req, res) => {
  try {
    const { mail } = req.body;
    const user = await User.findOne({ mail });
    
    if (!user) {
      return res.status(401).json({ auth: false, massaje: 'user no found' });
    }
    
    const token = await jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: 60 * 60 * 24
    });
    
    
    return res.json({ auth: true, user, token });
    
  } catch (error) {
    if (error) {
      res.status(500).send(error);
    }
  }
}

webPageController.logout = (req, res) => {
  jwt.sign({ id: req.userId }, process.env.SECRET_TOKEN, {
    expiresIn: 0
  });

  return res.json({ auth: false, messaje: 'user logout' });
}
